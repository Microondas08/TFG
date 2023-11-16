import pandas as pd
from flask import Flask, jsonify
from pymongo import MongoClient, errors

import logging
from flask.logging import default_handler
import warnings
import requests
4
warnings.filterwarnings("ignore", category=FutureWarning)

app = Flask(__name__)

# Configurar logging
app.logger.removeHandler(default_handler)
logging.basicConfig(level=logging.DEBUG)
df = pd.read_csv('depression_anxiety_data.csv')

# Crear una conexión con MongoDB
client = MongoClient("mongodb://localhost:27017")
db = client['health_data'] # Puedes cambiar el nombre 'health_data' al nombre de tu base de datos
results_collection = db['results'] # Esta es la colección donde almacenaremos los resultados


from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split


import pandas as pd
from sklearn.utils import resample
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

# Función para insertar los resultados en la base de datos
def insert_result(phq_score, gad_score, gender, need_treatment_result):
    result = {
        'phq_score': phq_score,
        'gad_score': gad_score,
        'gender': gender,
        'need_treatment': need_treatment_result
    }
    results_collection.insert_one(result)
def predict_treatment_status(phq_score, gad_score, gender):
    # Cargar los datos
    df = pd.read_csv('depression_anxiety_data.csv')
    df_temp = df.dropna(axis=0)
    df_temp.loc[:, 'gender'] = df_temp.gender.map({'male':1, 'female':0})
    df_temp = df_temp.astype({
        'depressiveness': int,
        'suicidal': int,
        'depression_diagnosis': int,
        'depression_treatment': int,
        'anxiousness': int,
        'anxiety_diagnosis': int,
        'anxiety_treatment': int,
        'sleepiness': int
    })
    df_temp = pd.get_dummies(df_temp, columns=['who_bmi', 'depression_severity', 'anxiety_severity'], drop_first=True)
    df_temp['treatment_status'] = df_temp['depression_treatment'] | df_temp['anxiety_treatment']

    data_majority = df_temp[df_temp['treatment_status'] == 0]
    data_minority = df_temp[df_temp['treatment_status'] == 1]
    data_minority_oversampled = resample(data_minority, replace=True, n_samples=len(data_majority), random_state=42)
    df_oversampled = pd.concat([data_majority, data_minority_oversampled])

    # Dividir los datos en conjunto de entrenamiento y prueba
    X = df_oversampled[['phq_score', 'gad_score', 'gender']]
    y = df_oversampled['treatment_status']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Crear y ajustar el modelo
    model = LogisticRegression()
    model.fit(X_train, y_train)

    # Realizar una predicción con los valores ingresados
    result = model.predict([[phq_score, gad_score, gender]])

    if result[0] == 1:
        return "Basado en los datos ingresados, es probable que busque tratamiento."
    else:
        return "Basado en los datos ingresados, es probable que no busque tratamiento."


@app.route('/get_treatment_status/<string:patient_id>', methods=['GET'])
def get_treatment_status(patient_id):
    url = f"http://localhost:8000/health/{patient_id}"

    response = requests.get(url)

    if response.status_code == 200:
        data_json = response.json()
        phq = data_json["phq_score"]
        gad = data_json["gad_score"]
        gen = 0 if data_json["gender"] == "female" else 1

        need_treatment_result = predict_treatment_status(phq_score=phq, gad_score=gad, gender=gen)

        # Guardar los resultados en MongoDB
        insert_result(phq, gad, gen, need_treatment_result)

        return jsonify({"need_treatment": need_treatment_result})
    else:
        return jsonify({"error": "No se pudo obtener el JSON desde la URL."}), 500


@app.route('/processing-data', methods=['GET'])
def get_all_data():
    try:
        # Recuperando todos los documentos de la colección
        data_cursor = results_collection.data_collection.find()

        # Convertir el cursor a una lista y luego a un formato JSON
        data_list = list(data_cursor)
        for item in data_list:
            # Convertir el ObjectID a string
            item['_id'] = str(item['_id'])

        return jsonify(data_list), 200
    except Exception as e:
        return jsonify({"message": "Error al obtener los datos", "error": str(e)}), 500

@app.route('/delete-ia-data', methods=['DELETE'])
def delete_ia_data():
    try:
        results_collection.delete_many({})
        return jsonify({"message": "Todos los datos en la colección IA han sido eliminados con éxito"}), 200
    except Exception as e:
        return jsonify({"message": "Error al eliminar los datos", "error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5000)


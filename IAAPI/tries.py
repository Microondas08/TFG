import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report
from sklearn.utils import resample

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

# Solicitar al usuario que ingrese los parámetros
try:
    phq_score = float(input("Por favor, ingrese el valor de phq_score: "))
    gad_score = float(input("Por favor, ingrese el valor de gad_score: "))
    gender = int(input("Por favor, ingrese el valor de género (1 para masculino, 0 para femenino): "))

    # Realizar una predicción con los valores ingresados
    result = model.predict([[phq_score, gad_score, gender]])

    if result[0] == 1:
        print("Basado en los datos ingresados, es probable que busque tratamiento.")
    else:
        print("Basado en los datos ingresados, es probable que no busque tratamiento.")

except ValueError:
    print("Por favor, ingrese valores válidos.")


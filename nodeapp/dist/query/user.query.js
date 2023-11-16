"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QUERY = void 0;
exports.QUERY = {
    SELECT_USERS: 'SELECT * FROM users',
    SELECT_USERS_BY_ID: 'SELECT * FROM users WHERE userId = ?',
    SELECT_USERS_BY_NAME: 'SELECT * FROM users WHERE userName = ?',
    CREATE_USER: 'INSERT INTO users (userName, nickname, surname, password, email) VALUES (?, ?, ?, ?, ?)',
    UPDATE_USER: 'UPDATE users SET userId=?, userName= ?, nickname=?, surname=?, password=?, email=? WHERE userId = ?',
    DELETE_USER: 'DELETE FROM users WHERE id = ?'
};

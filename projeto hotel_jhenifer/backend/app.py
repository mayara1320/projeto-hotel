import os
from flask import Flask, send_from_directory
import openpyxl #biblioteca para ler e escrever planilhas excel(.x)
from datetime import(
   datetime
)

import openpyxl.workbook #para registrar a data de cada cadastro automaticamente


# Caminho base do projeto (uma pastacina do beckend)
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".." ))

# Pasta frontend (HTML, JS)
FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")

#Pasta static (CSS)
STATIC_DIR= os.path.join(BASE_DIR, "static")

DB_DIR = os.path.join(os.path.dirname(__file__), "..", "db")
EXCEL_FILE = os.path.join(DB_DIR, "clientes.xlsx")

# Cabeçalho das colunas do Excel (linha 1)
COLUMNS = COLUMNS = [
     "ID",
     "Nome",
     "CPF",
     "Email",
     "Telefone",
     "Endereço",
     "Observações",
     "Data Cadastro",
]

def init_excel():
   if not os.path.exists(DB_DIR):
      os.makedirs(DB_DIR) #cria a pasta db se ainda nao existir

   if not os.path.exists(EXCEL_FILE):
    worbook = openpyxl.worbook() #cria uma nova planilha excel
    sheet = worbook.active #pega planilha ativa
    sheet.title = "clientes" #nomeia a aba principal
   

   
      


   
  




app = Flask(__name__, static_folder=STATIC_DIR, static_url_path="/" + STATIC_DIR)

@app.route("/")
def home():
    return send_from_directory(FRONTEND_DIR, "index.html")

@app.route("/consulta")
def consulta_page():
    return send_from_directory(FRONTEND_DIR, "consulta.html")

@app.route("/alterar")
def alterar_page():
 return send_from_directory (FRONTEND_DIR, "alterar.html")




if __name__ == "__main__":
    print("base_dir:, base_dir")
    print("frontend_dir:", FRONTEND_DIR)
    print("static_dir:", STATIC_DIR)
    app.run(debug=True)


# Import flask and datetime module for showing date and time
import re
from flask import Flask, jsonify, request, send_file
from werkzeug.utils import secure_filename
import datetime
import mysql.connector
import os
from flask_cors import CORS

# Replace these with your database credentials

# Establish a connection to the MySQL server
conn = mysql.connector.connect(
    host="127.0.0.1",
    user="root",
    password="root",
    database="hms"
)

# Check if the connection was successful
if conn.is_connected():
    print("Connected to the MySQL database")
else:
    print("Failed to connect to the database")
def autendoc(email,pas):
# Create a cursor object
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM doctors ")

    # Fetch the results
    results = cursor.fetchone()
    print(results)
    if(results==None):
        return False
    elif results[1]==pas :
        return True    
def sanitize_filename(filename):
    # Use a regular expression to remove any unwanted characters from the filename
    sanitized_filename = re.sub(r'[^\w\-.]', '', filename)
    return sanitized_filename
         
    
x = datetime.datetime.now()

# Initializing flask app
app = Flask(__name__)
CORS(app) 

UPLOAD_FOLDER = 'D:\\college\\HMS\\Newfolder\\hospital\\backend\\upload'

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
# Route for seeing a data
@app.route('/data')
def get_time():

	# Returning an api for showing in reactjs
	return {
		'Name':"geek", 
		"Age":"22",
		"Date":x, 
		"programming":"python"
		}


@app.route("/get_file", methods=["POST"])
def get_file():
    try:
        x =request.get_json()
        tem=x['message']
        filename=tem.replace(":",'')
        filename=filename+'.png'
        print(filename)
        #filename = 'admin930002023-10-27.png'
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        print(file_path)
        print(os.getcwd())
        file_path=os.path.join(os.getcwd(),file_path)
        print(file_path)
        if os.path.exists(file_path):
            return send_file(file_path, as_attachment=True)
        else:
            return "File not found", 404
    except Exception as e:
        print(str(e))
        return str(e), 500




@app.route('/upload', methods=['POST'])
def upload_file():
    try:
        if 'pdfFile' not in request.files:
            return jsonify({"error": "No file part"})

        file = request.files['pdfFile']
        message = request.form.get('message', '') 
        print(message)
        if file.filename == '':
            return jsonify({"error": "No selected file"}), 300

        if file:
            # Sanitize the filename
            cursor = conn.cursor()
            cursor.execute(" update Appointments set prescp = '1' where patient = '"+request.form.get('name', '') +"' and App_time = '"+request.form.get('time', '')+"' and App_date='"+request.form.get('date', '')+"';")
            conn.commit()

            filename = secure_filename(message)
            
            # Extract the original file extension
            original_filename = file.filename
            _, file_extension = os.path.splitext(original_filename)

            # Append the original file extension to the sanitized filename
            filename_with_extension = f"{filename}{file_extension}"
            print(filename_with_extension)
            
            # Save the file with the sanitized filename and original extension
            #print(os.path.join(app.config['UPLOAD_FOLDER'], filename_with_extension))
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename_with_extension))

            return jsonify({"message": "File uploaded successfully", "filename": filename_with_extension})

    except Exception as e:
        print('Error:', str(e))
        return jsonify({"error": "An error occurred while processing the data"}), 500

@app.route('/docverify', methods=['POST'])
def docLogin():
    try:
        data = request.get_json()
        # Process the received data here
        print('Received data:', data)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM doctors where email='"+data['email']+"';")

        # Fetch the results
        results = cursor.fetchone()
        print(results)
        if(results==None):
            return jsonify({"message": "NO"}),300
        elif results[1]==data['pass']  :
             return jsonify({"message": results[2]})
        return jsonify({"message": "NO"}),300
    except Exception as e:
        print('Error:', str(e))
        return jsonify({"error": "An error occurred while processing the data"}), 500

@app.route('/settiming',methods=['POST'])
def settiming():
    try:
        data=request.get_json()
        print('Received data:', data)
        cursor = conn.cursor()
        cursor.execute("select * from Appointments where doctor = '"+data['usr']+"' and App_time = '"+data['time']+"' and App_date='"+data['date'][0:10]+"';")
        result=cursor.fetchone()
        if (result==None):
            print('Writing')
            cursor.execute("insert into Appointments(doctor,App_time,App_date) values('"+data['usr']+"','"+data['time']+"','"+data['date'][0:10]+"');")
            conn.commit()
            return jsonify({"message":"done"})
        print('Deleting')
        cursor.execute("delete from appointments where  doctor = '"+data['usr']+"' and App_time = '"+data['time']+"' and App_date='"+data['date'][0:10]+"';")
        conn.commit()
        return jsonify({"message":"done"})
    except Exception as e:
        print('Error:', str(e))
        return jsonify({"error": "An error occurred while processing the data"}), 500
    

@app.route('/fetchtiming',methods=['POST'])
def fetchtiming():
    try:
        data=request.get_json()
        print('Received data:', data)
        cursor = conn.cursor()
        cursor.execute("select * from Appointments where doctor = '"+data['usr']+"' and App_time = '"+data['time']+"' and App_date='"+data['date'][0:10]+"';")
        result=cursor.fetchone()
        if (result==None):
            print('not present')
            return jsonify({"message":"1"})
        print(' present')
        return jsonify({"message":"0"})
        
    except Exception as e:
        print('Error:', str(e))
        return jsonify({"error": "An error occurred while processing the data"}), 500
    
@app.route('/fetchappointment',methods=['POST'])
def fetchappointment():
    try:
        data=request.get_json()
        print('Received data:', data)
        tem=[]
        x={}
        cursor = conn.cursor()
        querry ="select * from Appointments where patient = '"+data['patname']+"';"
        cursor.execute(querry)
        result=cursor.fetchall()
        print(result)
        print(querry)
        if (result==[]):
            print('not present')
            return jsonify({"name":"err"}),300
        for i in result:
            qu ="select * from doctors where doc_name  = '"+i[1]+"';"
            cursor.execute(qu)
            res=cursor.fetchone()
            print(result)
            x['special']=res[3]
            x['name']=i[1]
            x['time']=str(i[2])
            x['date']=str(i[3])
            tem.append(x)
            x={}
        
        print(' present',tem)
        return jsonify(tem)    
    except Exception as e:
        print('Error:', str(e))
        return jsonify({"error": "An error occurred while processing the data"}), 500
    
            
@app.route('/fetchfreetiming',methods=['POST'])
def fetchfreetiming():
    try:
        data=request.get_json()
        print('Received data:', data)
        tem=[]
        cursor = conn.cursor()
        querry ="select * from Appointments where doctor = '"+data['usr']+"' and App_time = '"+data['time']+"' and App_date='"+data['date'][0:10]+"' and patient is null;"
        cursor.execute(querry)
        result=cursor.fetchall()
        print(result)
        print(querry)
        if (result==[]):
            print('not free')
            return jsonify({"message":"0"})
        
        print('  free',result)
        return jsonify({"message":"1"})
        
    except Exception as e:
        print('Error:', str(e))
        return jsonify({"error": "An error occurred while processing the data"}), 500
    
@app.route('/fetchdoctors',methods=['POST'])
def fetchdoctors():
    try:
        data=request.get_json()
        print('Received data:', data)
        tem=[]
        x={}
        cursor = conn.cursor()
        querry ="select * from doctors where special = '"+data['typ']+"';"
        cursor.execute(querry)
        result=cursor.fetchall()
        print(result)
        print(querry)
        if (result==[]):
            print('not present')
            return jsonify({"name":"err"}),300
        for i in result:
            x['name']=i[2]
            tem.append(x)
        
        print(' present',tem)
        return jsonify(tem)
        
    except Exception as e:
        print('Error:', str(e))
        return jsonify({"error": "An error occurred while processing the data"}), 500
    

@app.route('/confirmappointment',methods=['POST'])
def confirmappointment():
    try:
        data=request.get_json()
        print('Received data:', data)
        cursor = conn.cursor()
        querry ="select * from Appointments where doctor = '"+data['usr']+"' and App_time = '"+data['time']+"' and App_date='"+data['date'][0:10]+"' and patient is null;"
        cursor.execute(querry)
        result=cursor.fetchone()
        print(result)
        print(querry)
        if (result!=None):
            cursor.execute("update Appointments set patient ='"+data['patname']+"' where doctor = '"+data['usr']+"' and App_time = '"+data['time']+"' and App_date='"+data['date'][0:10]+"' and patient is null;")
            conn.commit()
            print('done')
            return jsonify({"message":"1"})
        print(' not done')
        return jsonify({"message":"0"})
        
    except Exception as e:
        print('Error:', str(e))
        return jsonify({"error": "An error occurred while processing the data"}), 500


@app.route('/fetchappointmentdoctor', methods=['POST'])
def fetchappointmentdoctor():
    try:
        data = request.get_json()
        # Process the received data here
        print('Received data:', data)
        x={}
        cursor = conn.cursor()
        querry ="select * from Appointments where doctor = '"+data['docname']+"' and patient is not null;"
        print(querry)
        cursor.execute(querry)
        result = cursor.fetchall()
        tem=[]
        if (result==[]):
            return jsonify({"message": "done"})
        for i in result:
            x['name']=i[0]
            x['time']=str(i[2])
            x['date']=str(i[3])
            tem.append(x)
            x={}
        return jsonify(tem)
    except Exception as e:
        print('Error:', str(e))
        return jsonify({"error": "An error occurred while processing the data"}), 500



@app.route('/deleteappointment', methods=['POST'])
def deleteappointment():
    try:
        data = request.get_json()
        # Process the received data here
        print('Received data:', data)
        cursor = conn.cursor()
        querry="update Appointments set patient = null where doctor='"+data['name']+"' and App_time='"+data['time']+"' and App_date='"+data['date']+"';"
        print(querry)
        cursor.execute(querry)
        conn.commit()
        # Fetch the results
       
        return jsonify({"message": "done"})
    except Exception as e:
        print('Error:', str(e))
        return jsonify({"error": "An error occurred while processing the data"}), 500

@app.route('/patverify', methods=['POST'])
def patLogin():
    try:
        data = request.get_json()
        # Process the received data here
        print('Received data:', data)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM patient where email='"+data['email']+"';")

        # Fetch the results
        results = cursor.fetchone()
        print(results)
        if(results==None):
            return jsonify({"message": "NO"}),300
        elif results[1]==data['pass']  :
             return jsonify({"message": results[2]})
        return jsonify({"message": "NO"}),300
    except Exception as e:
        print('Error:', str(e))
        return jsonify({"error": "An error occurred while processing the data"}), 500
# Running app
if __name__ == '__main__':
	app.run(debug=True)

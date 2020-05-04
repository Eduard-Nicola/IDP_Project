import mysql.connector
import time

cnx = None

def db_manage():
	cursor = cnx.cursor()
	command = ("""USE carrental""")
	cursor.execute(command)

	while True:
		print("Enter command (add, delete, select, exit to close): ")
		command = input()

		if command == "add":
			# make, model, prod_year, displacement, horsepower, fuel_type, fuel_economy, price_per_day, reserved, reserved_from, reserved_to, image_url
			print("[add] Enter Make, Model, Production Year, Displacement, "
				"Horsepower, Fuel Type, Fuel Economy, Price/day and Image Name separated by space: ")
			aux = input()
			args = aux.split()

			# Insert values into database
			query = ("""INSERT INTO car (make, model, prod_year, displacement, horsepower, fuel_type, fuel_economy, price_per_day,
					reserved, reserved_from, reserved_to, image_url)
					VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)""")
			car_data = (args[0], args[1], int(args[2]), int(args[3]),
				int(args[4]), args[5], float(args[6]), float(args[7]),
				0, "none", "none", args[8])

			cursor.execute(query, car_data)
			cnx.commit()
			print("Inserted", cursor.rowcount, "row(s) of data.\n")
			continue

		if command == "select":
			print("\n")
			cursor.execute("SELECT * FROM car")

			result = cursor.fetchall()

			for x in result:
				print(x)
			print("\n")

			continue

		if command == "delete":
			print("[delete] Enter car ID: ")
			car_id = input()

			# Delete flight with given id
			query = ("DELETE FROM car WHERE id = %s")

			cursor.execute(query, (car_id,))
			cnx.commit()
			print("Deleted", cursor.rowcount, "row(s) of data.\n")
			continue

		if command == "exit":
			cnx.close()
			break

		else:
			print("Command not recognized\n")

if __name__ == '__main__':
	config = {
		'user': 'root',
		'password': 'carrental',
		'host': 'mysql',
		'port': '3306',
		'database': 'carrental'
	}

	time.sleep(10)
	cnx = mysql.connector.connect(**config)

	if cnx.is_connected() == True:
		print('Successfully connected to the database')

	db_manage()

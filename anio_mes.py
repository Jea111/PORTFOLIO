import calendar

yy = int(input("Enter Year: "))
mm = int(input("Enter Month: "))
dd = int(input("Enter day: "))

# Mostrar el nombre del mes:
print(f"Dia:{dd} del  mes: {calendar.month_name[mm]} del año {yy}")

# Mostrar el calendario del mes:
print(calendar.month(yy, mm))

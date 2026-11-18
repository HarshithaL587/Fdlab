while True:
    try:
        num = int ( input ( "enter a positive integer:" ))
        if num > 1:
           break
        else:
         print("please enter a number greater than 1")
    except ValueError:
        print("invalid input please enter a valid integer")
print ("prime factors are:" , end = " ")
while num% 2 == 0:
          print (2,end = " ")
          num//=2
          factor = 3
while factor * factor <num:
        while num%factor == 0:
         print(factor,end="")
         num //= factor
        factor = 2
if num> 2:
     print(num)


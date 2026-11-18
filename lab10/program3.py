import statistics
number = input ( "enter a number separated by spaces:" ).split()
number = [ int(x)for x in number ]

print ( "\n original list:",number )
mean_value = statistics.mean (number)
median_value = statistics.median (number)
try:
    mode_value = statistics.mode (number)
except statistics.statisticserror:
    mode_value= "number unique mode is found"

    print ( "\n mean:",mean_value )
    print ( "median:",median_value )
    print ( "mode:",mode_value )

    print ( "\n maximumvalue:",max (number))
    print( "minimumvalue:",min (number))

    sorted_list=sorted(number)
    print ( "\n sorted list:",sorted_list)

    unique_list=list (number)
    unique_list.sort()
    print ( "\n list after removing duplicates:",unique_list)
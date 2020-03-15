#!/bin/python
from bluetool import Bluetooth

bluetooth = Bluetooth()

fs_s=str(bluetooth.get_connected_devices())
no_el=int(len(bluetooth.get_connected_devices()))
fs_len=len(str(bluetooth.get_connected_devices()))

place=fs_s.find('name') 
#print(place)
#print(fs_s[place+8])

res = [i for i in range(len(fs_s)) if fs_s.startswith("name", i)]
#print(res)
l_r=len(res)
d_name=""
for x in range(0, l_r):
	#print(fs_s[res[x]+8])
	start=res[x]+8
	end=res[x]+8
	for y in range(start,fs_len):
		if fs_s[y]=="\'":
			end=y
			break
	for z in range(start,end):
		d_name+=fs_s[z]
	d_name+=" "
print(d_name)
	

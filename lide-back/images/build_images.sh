#!/bin/bash

# Ci-dessous la liste des images à build
liste=( py cpp java )


# éxécution en parrallele
for img in ${liste[*]}
do
	docker build --no-cache --tag ${img}_lide ./${img}/ &
done
wait

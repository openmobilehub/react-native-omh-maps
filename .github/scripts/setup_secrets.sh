#!/bin/bash
mkdir -p ~/.gradle
echo "MAPBOX_DOWNLOADS_TOKEN=$1" >> ~/.gradle/gradle.properties
echo "MAPS_API_KEY=$2" >> ./sample-app/android/local.properties
echo "MAPBOX_PUBLIC_TOKEN=$3" >> ./sample-app/android/local.properties
echo "AZURE_MAPS_SUBSCRIPTION_KEY=$4" >> ./sample-app/android/local.properties

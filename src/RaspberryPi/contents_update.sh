#!/bin/bash

ENCODE() {
    for (( i=0; i<${#1}; i++ )); do
        CHAR="${1:$i:1}"
        if [[ "$CHAR" =~ ^[a-zA-Z0-9]$ ]]; then
            printf "$CHAR"
        else
            printf '%%%x' "'$CHAR"
        fi
    done
}

DOMAIN="$(cat local/domain.txt)"
PANTRY_NAME="$(ENCODE "$(cat local/pantry_name.txt)")"
SIGNATURE="A"
FILE="local/current_contents.png"

DATE=$(date '+%Y%%2d%m%%2d%d')
TIME=$(date '+%H%%3a%M%%3a%S%%20%Z')

curl -X POST "$DOMAIN/contents_update?pantry_name=$PANTRY_NAME&signature=$SIGNATURE&date=$DATE&time=$TIME" --data-binary @"$FILE"


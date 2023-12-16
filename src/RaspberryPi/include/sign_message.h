#ifndef sign_message_h
#define sign_message_h

#include <stdio.h>
#include <stdlib.h>
#include <sodium.h>

#define PRIVATE_KEY_SIZE 
#define PUBLIC_KEY_SIZE
#define SIGNATURE_SIZE

void sign_message(char out[SIGNATURE_SIZE],
                  char private_key[PRIVATE_KEY_SIZE],
                  char public_key[PUBLIC_KEY_SIZE],
                  char const *filename);

#endif
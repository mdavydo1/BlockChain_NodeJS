#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include <sys/socket.h>
#include <sys/types.h>

#include <netinet/in.h>

int main() {

	//method for opening and reading from files - open a file to serve
	//FILE pointer to hold the data
	FILE *	html_data;
	html_data = fopen("index.html", "r");
	
	char response_data[1024];
	fgets(response_data, 1024, html_data);

	//HTTP/version number 200 OK
	char http_header[2048] = "HTTP/1.1 200 OK\r\n\n";
	strcat(http_header, response_data);

	//create a server socket
	int server_socket;
	server_socket = socket(AF_INET, SOCK_STREAM, 0);

	//define the address - this will define the server will srve the data
	struct sockaddr_in server_address;
	server_address.sin_family = AF_INET;
	server_address.sin_port = htons(8001);
	server_address.sin_addr.s_addr = INADDR_ANY;

	//bind socket to a port (once address [above] has been deifned)
	
	bind(server_socket, (struct sockaddr *) &server_address, sizeof(server_address));
	
	//listen for connections
	listen(server_socket, 5);
	
	//placeholder for the client socket - the connection that will be opened
	int client_socket;

	//want a continuous connection -  sending and responding: use an infinite while loop
	while(1) {
		client_socket = accept(server_socket, NULL, NULL);
		send(client_socket, http_header, sizeof(http_header), 0);	
		close(client_socket);
	}	


	return 0;
}

CREATE TABLE usuarios(
	name VARCHAR(64) NOT NULL,
	userName VARCHAR(32) NOT NULL,
	password VARCHAR(128) NOT NULL,
	CONSTRAINT pk_usuarios PRIMARY KEY(userName)
);


CREATE TABLE contactos(
	id SERIAL NOT NULL,
	userName VARCHAR(32) NOT NULL,
	nombre VARCHAR(32) NOT NULL,
	telefono VARCHAR(32) NOT NULL,
	email VARCHAR(64),
	CONSTRAINT pk_contactos PRIMARY KEY(id),
	CONSTRAINT fk_contactos_usuarios FOREIGN KEY(userName) REFERENCES usuarios(userName)
);
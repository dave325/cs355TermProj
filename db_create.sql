use heroku_376e5d0b653c734;
#DROP TABLE page;
CREATE TABLE page   (
	pageid int PRIMARY KEY AUTO_INCREMENT,
    url varchar(250),
    title varchar(60),
    description varchar(255),
    lastModified TIMESTAMP,
    lastIndexed TIMESTAMP,
    timeToIndex long
);
DROP TABLE word;
CREATE TABLE word  (
	wordid int PRIMARY KEY AUTO_INCREMENT,
    word varchar(250)
);

CREATE TABLE page_word (
	pageWordId int PRIMARY KEY AUTO_INCREMENT,
    wordId int,
    pageId int,
    freq int
);

CREATE TABLE search (
	searchId int pRIMARY KEY AUTO_INCREMENT,
    terms varchar(255),
    count int,
    searchDate TIMESTAMP DEFAULT current_timestamp,
    timeToSearch int
);

select * from word;

CREATE TABLE blogs (
    id SERIAL PRIMARY KEY, 
    author TEXT, 
    url TEXT NOT NULL, 
    title TEXT NOT NULL, 
    likes INT DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes) values ('Stephen Covey', 'stephencovey.com', '7 Habits of Highly Effective People', 5);
INSERT INTO blogs (author, url, title, likes) values ('Peter Tan', 'petertan.com', '7 Habits of Highly Effective People', 5);

INSERT INTO blogs (author, url, title) values ('Stephen Covey', 'stephencovey.com', '7 Habits of Highly Effective People');

INSERT INTO blogs(author, url) values ('Stephen Covey', 'stephencovey.com');
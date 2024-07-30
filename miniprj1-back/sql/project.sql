CREATE TABLE member
(
    id        INT PRIMARY KEY AUTO_INCREMENT,
    email     VARCHAR(100) NOT NULL,
    password  VARCHAR(100) NOT NULL,
    nick_name VARCHAR(20)  NOT NULL UNIQUE
);

SELECT *
FROM member;

CREATE TABLE authority
(
    member_id INT PRIMARY KEY REFERENCES member (id),
    name      VARCHAR(20) NOT NULL
);

DESC authority;

CREATE TABLE board
(
    id        INT PRIMARY KEY AUTO_INCREMENT,
    title     VARCHAR(200) NOT NULL,
    content   VARCHAR(800) NOT NULL,
    member_id INT          NOT NULL REFERENCES member (id)
);
ALTER TABLE board
    ADD COLUMN inserted DATETIME DEFAULT NOW();
ALTER TABLE board
    MODIFY COLUMN inserted DATETIME NOT NULL DEFAULT NOW();

DESC board;
SELECT *
FROM board;

INSERT INTO board(title, content, member_id)
SELECT title, content, member_id
FROM board;

CREATE TABLE board_file
(
    id       INT PRIMARY KEY AUTO_INCREMENT,
    board_id INT          NOT NULL REFERENCES board (id),
    name     VARCHAR(500) NOT NULL
);

SELECT *
FROM board_file;

CREATE TABLE comment
(
    id        INT PRIMARY KEY AUTO_INCREMENT,
    comment   VARCHAR(500) NOT NULL,
    board_id  INT          NOT NULL REFERENCES board (id),
    member_id INT          NOT NULL REFERENCES member (id),
    inserted  DATETIME     NOT NULL DEFAULT NOW()
);

SELECT * FROM comment;
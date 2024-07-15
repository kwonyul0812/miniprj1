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
USE people;
CREATE TABLE IF NOT EXISTS ContactType (
    ContactTypeID INT NOT NULL AUTO_INCREMENT,
    Name VARCHAR(100) NOT NULL,
    PRIMARY KEY (ContactTypeID)
);
INSERT INTO ContactType
(ContactTypeID, Name)
VALUES(1, N'Accounting Manager'),
      (2, N'Assistant Sales Agent'),
      (3, N'Assistant Sales Representative'),
      (4, N'Coordinator Foreign Markets'),
      (5, N'Export Administrator'),
      (6, N'International Marketing Manager'),
      (7, N'Marketing Assistant'),
      (8, N'Marketing Manager'),
      (9, N'Marketing Representative'),
      (10, N'Order Administrator'),
      (11, N'Owner'),
      (12, N'Owner/Marketing Assistant'),
      (13, N'Product Manager'),
      (14, N'Purchasing Agent'),
      (15, N'Purchasing Manager'),
      (16, N'Regional Account Representative'),
      (17, N'Sales Agent'),
      (18, N'Sales Associate'),
      (19, N'Sales Manager'),
      (20, N'Sales Representative');
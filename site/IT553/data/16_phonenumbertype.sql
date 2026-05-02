USE people;
CREATE TABLE IF NOT EXISTS PhoneNumberType (
    PhoneNumberTypeID INT NOT NULL,
    Name VARCHAR(100) NOT NULL,
    PRIMARY KEY (PhoneNumberTypeID)
);

INSERT INTO PhoneNumberType
(PhoneNumberTypeID, Name)
VALUES(1, N'Cell'),
      (2, N'Home'),
      (3, N'Work');

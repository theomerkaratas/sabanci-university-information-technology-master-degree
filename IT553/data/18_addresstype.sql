USE people;
CREATE TABLE IF NOT EXISTS AddressType (
    AddressTypeID INT NOT NULL,
    Name VARCHAR(100) NOT NULL,
    PRIMARY KEY (AddressTypeID)
);

INSERT INTO AddressType
(AddressTypeID, Name)
VALUES(6, N'Archive'),
      (1, N'Billing'),
      (2, N'Home'),
      (3, N'Main Office'),
      (4, N'Primary'),
      (5, N'Shipping');
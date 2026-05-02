ALTER TABLE Password
    ADD CONSTRAINT fk_password_person
    FOREIGN KEY (BusinessEntityID)
        REFERENCES Person(BusinessEntityID)
        ON DELETE CASCADE
        ON UPDATE CASCADE;

ALTER TABLE EmailAddress
    ADD CONSTRAINT fk_emailaddress_person
    FOREIGN KEY (BusinessEntityID)
        REFERENCES Person(BusinessEntityID)
        ON DELETE CASCADE
        ON UPDATE CASCADE;

ALTER TABLE PersonPhone
    ADD CONSTRAINT fk_personphone_person
    FOREIGN KEY (BusinessEntityID)
        REFERENCES Person(BusinessEntityID)
        ON DELETE CASCADE
        ON UPDATE CASCADE;

ALTER TABLE PersonPhone
    ADD CONSTRAINT fk_pesonphone_person
    FOREIGN KEY (PhoneNumberTypeID)
        REFERENCES PhoneNumberType(PhoneNumberTypeID)
        ON DELETE CASCADE
        ON UPDATE CASCADE;

ALTER TABLE Address
    ADD CONSTRAINT fk_address_person
    FOREIGN KEY (StateProvinceID)
        REFERENCES StateProvince(StateProvinceID)
        ON DELETE CASCADE
        ON UPDATE CASCADE;

ALTER TABLE Person
    ADD CONSTRAINT fk_person_businessentity
    FOREIGN KEY (BusinessEntityID)
        REFERENCES BusinessEntity(BusinessEntityID)
        ON DELETE CASCADE
        ON UPDATE CASCADE;

ALTER TABLE StateProvince
    ADD CONSTRAINT fk_stateprovince_person
    FOREIGN KEY (CountryRegionCode)
        REFERENCES CountryRegion(CountryRegionCode)
        ON DELETE CASCADE
        ON UPDATE CASCADE;

ALTER TABLE BusinessEntityContact
    ADD CONSTRAINT fk_businessentitycontact_person
    FOREIGN KEY (BusinessEntityID)
        REFERENCES BusinessEntity(BusinessEntityID)
        ON DELETE CASCADE
        ON UPDATE CASCADE;

ALTER TABLE BusinessEntityContact
    ADD CONSTRAINT fk_businessentitycontact_2_person
    FOREIGN KEY (PersonID)
        REFERENCES Person(BusinessEntityID)
        ON DELETE CASCADE
        ON UPDATE CASCADE;

ALTER TABLE BusinessEntityAddress
    ADD CONSTRAINT fk_businessentityaddress_2_person
    FOREIGN KEY (AddressTypeID)
        REFERENCES AddressType(AddressTypeID)
        ON DELETE CASCADE
        ON UPDATE CASCADE;

ALTER TABLE BusinessEntityAddress
    ADD CONSTRAINT fk_businessentityaddress_person
    FOREIGN KEY (AddressID)
        REFERENCES Address(AddressID)
        ON DELETE CASCADE
        ON UPDATE CASCADE;

ALTER TABLE BusinessEntityAddress
    ADD CONSTRAINT fk_businessentity_person
    FOREIGN KEY (BusinessEntityID)
        REFERENCES BusinessEntity(BusinessEntityID)
        ON DELETE CASCADE
        ON UPDATE CASCADE;

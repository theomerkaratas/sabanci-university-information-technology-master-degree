USE people;

DELIMITER $$
CREATE TRIGGER trg_restrict_persondelete
BEFORE DELETE ON Person
FOR EACH ROW
BEGIN
  IF (SELECT COUNT(*) FROM BusinessEntityContact
        WHERE PersonID = OLD.BusinessEntityID) > 0 THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Cannot delete person because they have existing business contacts.';
  END IF;
END$$
DELIMITER ;

USE people;

DELIMITER $$
CREATE TRIGGER trg_validate_emailformat
BEFORE INSERT ON EmailAddress
FOR EACH ROW
BEGIN
  IF NEW.EmailAddress NOT LIKE '%@%.%' THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Invalid email address format. Email must contain "@" and "."';
  END IF;
END$$
DELIMITER ;

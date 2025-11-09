SELECT p.BusinessEntityID, p.FirstName, p.LastName, ph.PhoneNumber 
FROM Person p 
LEFT JOIN PersonPhone ph ON ph.BusinessEntityID=p.BusinessEntityID 
ORDER BY p.LastName LIMIT 30;

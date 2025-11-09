SELECT p.BusinessEntityID, p.FirstName, p.LastName, e.EmailAddress 
FROM Person p 
LEFT JOIN EmailAddress e ON e.BusinessEntityID=p.BusinessEntityID 
ORDER BY p.LastName LIMIT 30;

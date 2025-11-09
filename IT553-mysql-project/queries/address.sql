SELECT a.AddressID, a.AddressLine, a.City, sp.Name AS State, cr.Name AS Country 
FROM Address a 
JOIN StateProvince sp ON sp.StateProvinceID=a.StateProvinceID 
JOIN CountryRegion cr ON cr.CountryRegionCode=sp.CountryRegionCode 
ORDER BY a.AddressID LIMIT 30;

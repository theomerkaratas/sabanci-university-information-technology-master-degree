-- PostgreSQL init script for TrueBank
CREATE TABLE IF NOT EXISTS accounts (
    account_number VARCHAR(20) PRIMARY KEY,
    owner_name VARCHAR(100) NOT NULL,
    balance NUMERIC(18,2) NOT NULL,
    account_type VARCHAR(10) NOT NULL,
    open_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL,
    class_name VARCHAR(30) NOT NULL
);

INSERT INTO accounts (account_number, owner_name, balance, account_type, open_date, status, class_name) VALUES
('1001', 'Ali Yilmaz', 12500.75, 'TRY', '2022-03-15', 'ACTIVE', 'SavingsAccount'),
('1002', 'Ayse Demir', 7500.0, 'USD', '2023-07-10', 'ACTIVE', 'CheckingAccount'),
('1003', 'Mehmet Kaya', 4109.590909090909, 'EUR', '2024-01-22', 'ACTIVE', 'SavingsAccount'),
('1004', 'Elif Aydin', 0.0, 'TRY', '2021-11-05', 'CLOSED', 'SavingsAccount'),
('1005', 'Canan Gunes', 500.0, 'USD', '2025-06-30', 'FROZEN', 'CheckingAccount'),
('1006', 'Deniz Arslan', 7800.2, 'EUR', '2023-09-18', 'ACTIVE', 'SavingsAccount');

# SEC509 Laboratory 4: Web Application Vulnerability Analysis

This repository contains the report and findings for Lab 4 of the SEC509 course. The objective of this laboratory is to perform a security assessment of a target web application, identifying common vulnerabilities and demonstrating potential exploitation vectors.

## Project Overview

The assessment focused on a target web application (`http://156.67.31.50:10007`) to identify security flaws based on the OWASP Top 10 categories. The analysis involved manual reconnaissance, endpoint discovery, and automated data harvesting.

## Files in this Repository

- `omerkaratas_38160.pdf`: Comprehensive laboratory report detailing the vulnerability identification, exploitation steps, and impact assessment.
- `README.md`: This documentation file.

## Identified Vulnerabilities

The following security issues were identified and documented during the assessment:

1. **Information Disclosure (robots.txt)**: Sensitive administrative and banking endpoints were exposed via the `robots.txt` file, aiding in reconnaissance.
2. **Security Misconfiguration**: Exposure of a sensitive banking portal (`/tombankhadi-login`) on the same infrastructure as the primary news application.
3. **IDOR / Resource Enumeration**: Predictable sequential IDs in the `/news/[ID]` path allowed for systematic crawling of all articles.
4. **API Endpoint IDOR**: The `/api/user/[ID]` endpoint failed to validate authorization, allowing any authenticated user to view private details (emails, roles) of other users.
5. **Automated User Enumeration**: Demonstrated the use of a Python automation script to harvest the entire user database.
6. **Broken Authentication**: Weak and predictable security questions ("In which city were you born?") enabled account takeover (ATO) of high-privileged accounts, including the administrator.

## Methodology

- **Reconnaissance**: Manual path discovery and inspection of configuration files (e.g., `robots.txt`, `sitemap.xml`).
- **Surface Analysis**: Identifying attack surfaces such as login forms, registration pages, and search bars.
- **Exploitation**: Demonstration of IDOR vulnerabilities and automated enumeration using Python scripts.
- **Impact Assessment**: Evaluating the severity of each finding on the application's confidentiality and integrity.

---
*Created by Ömer Faruk Karataş as part of the Sabancı University Information Technology Master's Degree Program.*

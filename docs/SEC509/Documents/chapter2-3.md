# Understanding PAM and Password Complexity Policy

## 1. Introduction

## 2. What is PAM?

**PAM** stands for **Pluggable Authentication Module**. Think of it as a security system that controls how people log in and what they're allowed to do on Unix/Linux computers.

### How PAM Works

PAM is flexible because it supports different ways of verifying who you are. For example, you could log in using:

- Your local computer's password (the simplest method)
- Kerberos (a more advanced security system)
- SSSD (another authentication method)

For each of these login methods, there's a specific PAM module (a small program) that handles the verification.

---

## 3. Enforcing Password Complexity Policy

### What Does "Password Complexity" Mean?

Instead of letting people set weak passwords like "password123," a password complexity policy forces users to create **strong, harder-to-crack passwords** by requiring certain types of characters.

### The Tool: pam_pwquality.so

**pam_pwquality.so** is a PAM module (a security tool) that checks if a new password is strong enough before allowing it to be set. It replaced an older tool called `pam_cracklib` in older Red Hat systems.

### How pam_pwquality.so Checks Your Password

When you create a new password, the system performs **two main checks**:

1.  **Step 1: Check If It's a Dictionary Word**
    First, it checks if your password is just a common word from the dictionary. If it is, it rejects it. If it passes this check, it moves to Step 2.

2.  **Step 2: Check Against Specific Rules**
    The system checks your password against several rules to make sure it's not too similar to your old password or too simple:

| Rule | What It Checks |
| :--- | :--- |
| **Palindrome** | Is your new password spelled the same backwards and forwards? (Not allowed) |
| **Case Change Only** | Is the new password just the old one with UPPERCASE changed to lowercase? (Not allowed) |
| **Similar** | Is the new password too much like your old password? (Not allowed) |
| **Simple** | Is the new password too short? (Not allowed) |
| **Rotated** | Is the new password just your old password shifted by one letter? (Not allowed) |
| **Same Consecutive Characters** | Does it have too many of the same letter in a row? (Configurable) |
| **Contains Username** | Does the password contain your username? (Configurable - usually not allowed) |

3.  **Step 3: Re-enter Password**
    If your password passes all checks, the system asks you to type it again to make sure you didn't make a typo.

---

## 4. How to Configure Password Complexity Rules

You can customize these password rules in **two ways**:

### Method 1: Edit the Configuration File

#### Step 1: Back Up the Files (IMPORTANT!)

Before making changes, always create backup copies of the files you're about to edit:

```bash
sudo cp /etc/security/pwquality.conf /etc/security/pwquality.conf.original
sudo cp /etc/pam.d/system-auth /etc/pam.d/system-auth.original
```

> [!NOTE]
> **Why?** If something goes wrong, you can restore the original files. The `sudo` command is needed because these are system files that only administrators can modify.

#### Step 2: Open the PAM Configuration File

```bash
sudo vim /etc/pam.d/system-auth
```

#### Step 3: Find and Modify the pam_pwquality.so Line

Look for this line:

```text
password requisite pam_pwquality.so try_first_pass local_users_only retry=3 authtok_type=.
```

This is the line that controls password complexity. You'll add your rules here.

---

## 5. Password Complexity Options (The Rules You Can Set)

Here are the main settings you can configure:

| Setting | What It Does | Example |
| :--- | :--- | :--- |
| **minlen=N** | Sets the minimum number of characters a password must have | `minlen=15` means at least 15 characters |
| **lcredit=N** | Requires lowercase letters (use `-1` to require at least one) | `lcredit=-1` means at least 1 lowercase letter required |
| **ucredit=N** | Requires uppercase letters (use `-1` to require at least one) | `ucredit=-1` means at least 1 uppercase letter required |
| **dcredit=N** | Requires digits/numbers (use `-1` to require at least one) | `dcredit=-1` means at least 1 number required |
| **ocredit=N** | Requires special symbols like @, #, !, $, %, etc. (use `-1` to require at least one) | `ocredit=-1` means at least 1 symbol required |
| **maxrepeat=N** | Limits how many times the same character can appear in a row | `maxrepeat=3` means you can't have "aaaa" (more than 3 a's in a row) |
| **enforce_for_root** | Forces even the admin (root user) to follow these rules | Ensures nobody gets special treatment |

### Example: Creating a Strong Password Policy

**Let's say you want to require passwords to have:**

- At least 15 characters
- At least 1 lowercase letter
- At least 1 uppercase letter
- At least 1 number
- At least 1 special symbol
- No more than 3 of the same character in a row

**You would modify the line to look like this:**

```text
password requisite pam_pwquality.so try_first_pass local_users_only retry=3 authtok_type= minlen=15 lcredit=-1 ucredit=-1 dcredit=-1 ocredit=-1 maxrepeat=3
```

### Method 2: Edit the Configuration File Directly

You can also edit the `/etc/security/pwquality.conf` file using a text editor:

```bash
sudo vim /etc/security/pwquality.conf
```

Find these lines in the file and uncomment them (remove the `#` symbol) and update the values:

```text
minlen = 15
maxrepeat = 3
lcredit = -1
ucredit = -1
dcredit = -1
ocredit = -1
```

#### What Each Setting Means:

- **minlen**: The shortest password allowed
- **maxrepeat**: Maximum times the same letter can repeat in a row
- **lcredit**: Minimum lowercase letters needed
- **ucredit**: Minimum uppercase letters needed
- **dcredit**: Minimum numbers needed
- **ocredit**: Minimum special symbols needed

#### How to Save Your Changes:

After editing the file, press `Esc`, then type `:wq` and press `Enter` to save and exit.

---

## 6. Testing Password Enforcement and Preventing Password Reuse

After configuring the policies, the next critical step is to verify that they work as intended. This involves testing both as a regular user and as a root user to understand how the system manages password changes under different circumstances.

---

## 7. Testing Password Complexity for Regular Users

Now that you've set up the password complexity rules, it's important to test them to make sure they're working correctly. The best way to do this is to try changing a password as a regular (non-root) user and test both weak and strong passwords.

### Step 1: Try to Change Your Password

Use the `passwd` command to attempt to change your password. This is the command that regular users use to modify their own passwords:

```bash
passwd
```

### Step 2: Test with a Weak Password (That Will Fail)

First, try entering a password that **doesn't meet** your complexity requirements. The system will reject it and tell you why. Here's an example of what happens:

```text
[amos@cent7 ~]$ passwd
Changing password for user amos.
Changing password for amos.
(current) UNIX password: [You enter your current password here]
New password: BAD PASSWORD: The password is too similar to the old one
New password: BAD PASSWORD: The password is too similar to the old one
New password: [System keeps rejecting it...]
```

> [!WARNING]
> **What's happening?** The system is rejecting your password attempts because:
> - The password is too similar to your previous password
> - The system will keep asking until you provide a strong password that meets all the rules

### Step 3: Try with a Strong Password (That Will Succeed)

Now try a password that **meets all** your complexity requirements. In this example, the rules require:

- At least 15 characters
- At least 1 lowercase letter
- At least 1 uppercase letter
- At least 1 number
- At least 1 special symbol

A password like **MyP@ssw0rdNEwonE** would work because it has all these elements. Here's what success looks like:

```text
[amos@cent7 ~]$ passwd
Changing password for user amos.
Changing password for amos.
(current) UNIX password: password
New password: MyP@ssw0rdNEwonE
Retype new password: MyP@ssw0rdNEwonE
passwd: all authentication tokens updated successfully.
[amos@cent7 ~]$
```

> [!TIP]
> **✓ Success!** The message "all authentication tokens updated successfully" means your new password has been accepted and set.

---

## 8. Enforcing Password Complexity for Root Users

### The Problem: Root Users Can Bypass the Rules

By default, the password complexity rules we set up only apply to **regular users**. If an administrator (root user) or someone with `sudo` privileges tries to change a password, they can set **any password they want**, even weak ones.

> [!WARNING]
> **Why is this a problem?**
> If your security policy requires complex passwords, it should apply to **everyone**.

### The Solution: Add enforce_for_root

To force **even root users** to follow the password complexity rules, you need to add the `enforce_for_root` option to your PAM configuration file.

#### How to Update the Configuration

Open the system authentication file:

```bash
sudo vim /etc/pam.d/system-auth
```

Find the line with `pam_pwquality.so` and add `enforce_for_root` at the end. Here's what it should look like:

```text
password requisite pam_pwquality.so try_first_pass local_users_only retry=3 authtok_type= minlen=8 lcredit=-1 ucredit=-1 dcredit=-1 ocredit=-1 maxrepeat=3 enforce_for_root
```

#### Step 1: Test Root with a Weak Password (Will Fail)

As the root user, try to change another user's password using a weak password:

```text
[root@cent7 ~]# passwd amos
Changing password for user amos.
New password: simple123
BAD PASSWORD: The password contains less than 1 digits
New password: BAD PASSWORD: The password is shorter than 15 characters
New password: BAD PASSWORD: The password contains less than 1 uppercase letters
passwd: Have exhausted maximum number of retries for service
[root@cent7 ~]#
```

**What's happening here?**
Even though you're root (the most powerful user on the system), the system is still rejecting your password attempts because:
- The password doesn't have enough digits
- The password is too short (less than 15 characters)
- The password doesn't have uppercase letters
- After 3 failed attempts, it stops allowing retries

#### Step 2: Test Root with a Strong Password (Will Succeed)

Now, as root, try again using a password that meets all requirements, like **MyP@ssw0rdNEwonE**:

```text
[root@cent7 ~]# passwd amos
Changing password for user amos.
New password: MyP@ssw0rdNEwonE
Retype new password: MyP@ssw0rdNEwonE
passwd: all authentication tokens updated successfully.
[root@cent7 ~]#
```

> [!TIP]
> **✓ Success!** Now the root user can also only set passwords that meet the complexity requirements.

---

## 9. Preventing Users from Reusing Old Passwords

### What is Password History?

Imagine if a user had to change their password every month. Without password history protection, they could do this:

- Month 1: Password = **SecurePass123!**
- Month 2: Change to **NewPass456!**
- Month 3: Change back to **SecurePass123!** (same old password!)

This defeats the purpose of forcing regular password changes! To prevent this, we use **password history**—the system remembers old passwords and won't let users reuse them.

### The Tool: pam_pwhistory.so

**pam_pwhistory.so** is a security module that keeps a record of a user's previous passwords. If a user tries to set a new password that matches one of their recent old passwords, the system rejects it.

### How It Works

The module:
- Saves the last X passwords for each user (default is 10)
- Compares any new password against the saved old passwords
- Rejects the new password if it matches any of the saved old ones
- Forces the user to pick a completely new password

#### Step 1: Set Up Password History

Open the system authentication configuration file:

```bash
sudo vim /etc/pam.d/system-auth
```

Add this line **just after** the first `password requisite` line:

```text
password requisite pam_pwhistory.so debug use_authtok remember=12 retry=3 enforce_for_root
```

#### Understanding the Options

| Option | What It Does | Example |
| :--- | :--- | :--- |
| **debug** | Turns on detailed logging to help troubleshoot problems. Records what's happening in the system logs. | Helpful for testing and finding issues |
| **use_authtok** | Tells the module to accept the password that passed the complexity checks (from pam_pwquality) and use it for the history check. | Prevents asking the user to enter their password twice |
| **remember=N** | Sets how many **previous passwords** the system should remember and block. Default is 10. | `remember=12` means "don't let users reuse any of their last 12 passwords" |
| **retry=N** | The number of times a user can try to enter a new password before getting an error. | `retry=3` means they get 3 attempts before the system stops |
| **enforce_for_root** | Forces even root users to follow the password history rules. | Ensures administrators also can't reuse old passwords |

#### Step 2: Test Password History - First Password Change

As root, change a user's password to a new, strong password:

```text
[root@cent7 ~]# passwd amos
Changing password for user amos.
New password: ruIcWocFufPhij#1
Retype new password: ruIcWocFufPhij#1
passwd: all authentication tokens updated successfully.
[root@cent7 ~]#
```

> [!TIP]
> **✓ Password set successfully.** The system has saved this password in the history.

#### Step 3: Test Password History - Second Password Change

Now, try to change the password again immediately, and try to reuse the **same password we just set**:

```text
[root@cent7 ~]# passwd amos
Changing password for user amos.
New password: ruIcWocFufPhij#1
Retype new password: ruIcWocFufPhij#1
Password has been already used. Choose another.
passwd: Authentication token manipulation error
[root@cent7 ~]#
```

> [!WARNING]
> **✗ Password rejected!** The message "Password has been already used. Choose another" appears because:
> - The system remembers the password you just set
> - It refuses to let you reuse it
> - You must pick a completely different password

### How This Protects Your System

By preventing password reuse, you ensure:
- **Forced password rotation actually works** — Users can't just change their password back to the old one
- **Reduced security risk** — Old passwords (that might have been compromised) can't be reused
- **Better compliance** — Many security standards require that old passwords can't be reused

---

## 10. Summary: Complete Password Security

Password complexity policies ensure users create strong passwords by using tools like **pam_pwquality.so**. By building a complete security system, you now have:

- **Password Complexity (pam_pwquality)** — Forces passwords to be strong with a mix of uppercase, lowercase, numbers, and symbols.
- **Root Enforcement (enforce_for_root)** — Ensures even administrators follow the security rules.
- **Password History (pam_pwhistory)** — Prevents users from reusing old, potentially compromised passwords.

Together, these tools create a robust security policy that makes passwords much harder to crack and forces all users to maintain strong, unique credentials over time!

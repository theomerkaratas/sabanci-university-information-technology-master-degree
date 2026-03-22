# Understanding the Password Complexity Policy

## What is a Password Complexity Policy?

A **Password Complexity Policy** is a set of rules that forces users to create strong, hard-to-guess passwords. Instead of allowing weak passwords like `password123`, the system acts like a strict gatekeeper—checking every new password against a list of requirements before accepting it.

---

## What is PAM? (The Security Framework)

**PAM** stands for **Pluggable Authentication Module**.

Think of PAM as the **security manager** of a computer. It controls how users prove who they are (authentication) and what they’re allowed to do (authorization).

- **Pluggable** means it’s modular. If an administrator wants to change how passwords are checked—for example, switching from checking locally to checking against a company-wide directory—they can simply "plug in" a different module.
- PAM is used in most Unix-like systems (Linux, macOS, etc.).

### Where Do Passwords Come From?

Unix systems can use different sources to store and verify passwords. PAM works with all of them. Here are the most common:

| Authentication Source                      | What It Does                                                                                                                                |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **Local Authentication**                   | Passwords are stored directly on the computer itself. Best for personal devices or standalone systems.                                      |
| **SSSD** (System Security Services Daemon) | Connects to a central identity provider (like Active Directory or LDAP). Used in organizations so users have one password for many systems. |
| **Kerberos**                               | A network authentication protocol. Often used in enterprise environments for secure single sign-on.                                         |

> **Key Idea:** Regardless of where the password is stored, **PAM applies the same complexity rules to everything**.

---

## The Tool: `pam_pwquality.so`

To enforce password complexity, the system uses a module called **`pam_pwquality.so`**.

- In older versions of Red Hat Enterprise Linux (RHEL 6 and earlier), this module was called `pam_cracklib`.
- `pam_pwquality.so` is the newer, more powerful replacement.

### How It Works: Two-Step Password Inspection

When a user tries to change their password, `pam_pwquality.so` performs two major checks.

---

### Step 1: Dictionary Check

The system checks whether the password is a common word found in a dictionary.

- **Why this matters:** Attackers often use "dictionary attacks"—automated tools that try thousands of common words and simple variations.
- **If the password is in the dictionary:** It is **immediately rejected**, even if you add numbers or symbols.

> **Example:** `Superman` or `Happiness2024` would likely be rejected because the base word is a dictionary entry.

---

### Step 2: Similarity to Old Password

If the password passes the dictionary check, the system then checks whether the **new password is too similar to the old password**. This prevents users from making tiny, predictable changes.

Here are the specific rules the module checks:

| Rule                            | What It Means                                                                | Example (Old Password: `Winter2023`)                 |
| ------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------- |
| **Palindrome**                  | The new password reads the same forwards and backwards.                      | `racecar`                                            |
| **Case Change Only**            | The only difference is uppercase/lowercase.                                  | `wINTER2023`                                         |
| **Similar**                     | The new password is basically the same as the old one.                       | `Winter2024` (only changed a number)                 |
| **Simple**                      | The new password is too short or lacks complexity.                           | `abc123`                                             |
| **Rotated**                     | The new password is a shifted version of the old one (like a Caesar cipher). | `Xjmuw2023` (each letter shifted forward)            |
| **Same Consecutive Characters** | The password contains too many repeating characters in a row.                | `Winterrrr2023`                                      |
| **Contains Username**           | The password includes the user’s login name.                                 | If username is `john.doe`, password is `JohnDoe2023` |

> **Note:** Some checks (like consecutive characters and username inclusion) are optional and can be turned on or off by the system administrator.

---

### Step 3: Confirmation

If the new password passes **both** the dictionary check and the similarity checks, the system determines it is strong enough.

The user is then prompted to **re-enter the password** to confirm there were no typing mistakes. Only after this confirmation is the password officially saved.

---

## Summary: Putting It All Together

| Concept                        | Plain English Analogy                                                  |
| ------------------------------ | ---------------------------------------------------------------------- |
| **Password Complexity Policy** | The rulebook that says what makes a strong password.                   |
| **PAM**                        | The security guard who enforces the rules.                             |
| **`pam_pwquality.so`**         | The checklist the security guard uses to test every new password.      |
| **Dictionary Check**           | Making sure your password isn’t a common word hackers would try first. |
| **Similarity Checks**          | Making sure you didn’t just slightly change your old password.         |
| **Confirmation Prompt**        | Typing it twice to avoid typos.                                        |

---

## Why This Matters

These checks exist to protect against common attack methods:

- **Dictionary attacks** are stopped by Step 1.
- **Predictable password changes** (e.g., `Spring2023` → `Summer2023`) are stopped by Step 2.
- **Weak or easily guessed passwords** are prevented from ever being used.

By enforcing these rules, organizations reduce the risk of unauthorized access through compromised credentials.

## Configuring Password Complexity (Making the Rules Stick)

Now that we understand _what_ the password checks are, let’s look at _how_ administrators configure them.

There are **two ways** to adjust these password rules:

1. **Using a configuration file:** `/etc/security/pwquality.conf`
2. **Adding arguments directly** to the PAM module line in `/etc/pam.d/system-auth`

Before making any changes, it’s essential to create backups—this way, if something breaks, you can easily restore the original settings.

---

### Step 1: Create Backups (Safety First)

Because you’re modifying system files, you need **administrator privileges**. Think of this like needing a master key to access a secure control panel.

### Backup the First File: `pwquality.conf`

Run this command in the terminal:

```bash
sudo cp /etc/security/pwquality.conf /etc/security/pwquality.conf.original
```

### What this does:

- `sudo` – Runs the command with administrator privileges (required for system directories).
- `cp` – Copies the file.

The second part creates a duplicate named `pwquality.conf.original` in the same folder.

### Why backup?

If you accidentally misconfigure the file, you can restore it by copying the `.original` file back.

---

### Backup the Second File: `system-auth`

Run this command:

```bash
sudo cp /etc/pam.d/system-auth /etc/pam.d/system-auth.original
```

This creates a backup of the PAM configuration file that controls authentication rules.

---

## Step 2: Open the Main Configuration File

The main file you'll edit is `/etc/pam.d/system-auth`. This file tells the system how to handle authentication.

Open it with a text editor (this example uses `vim`, but you can use `nano` or any editor):

```bash
sudo vim /etc/pam.d/system-auth
```

---

## Step 3: Find the Right Line

Inside the file, look for a line that contains `pam_pwquality.so`. It will look something like this:

```text
password requisite pam_pwquality.so try_first_pass local_users_only retry=3 authtok_type=
```

### What does this line mean?

- **`password`** – This rule applies when setting or changing passwords.
- **`requisite`** – If this check fails, the process stops immediately (strict enforcement).
- **`pam_pwquality.so`** – The module that performs the complexity checks.
- **`try_first_pass`** – Tries to use any existing password first before prompting.
- **`local_users_only`** – Only applies to local users (not network-based accounts).
- **`retry=3`** – Allows the user up to 3 attempts to enter a valid password.
- **`authtok_type=`** – An optional field for specifying authentication token types.

This is the line you will modify to add your custom password rules.

---

## Step 4: Add Your Password Complexity Rules

You can add extra arguments to this line to enforce specific complexity requirements. Each argument is a setting that controls a different aspect of password strength.

Here are the options used in this scenario, explained in plain language:

### Configuration Options Reference

| Argument           | What It Does                                                     | Example                                                                                              |
| ------------------ | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `minlen=N`         | Sets the minimum length for passwords to N characters.           | `minlen=12` means passwords must be at least 12 characters long.                                     |
| `lcredit=N`        | Requires a minimum number of lowercase letters.                  | `lcredit=1` means at least one lowercase letter (a, b, c).                                           |
| `ucredit=N`        | Requires a minimum number of uppercase letters.                  | `ucredit=1` means at least one uppercase letter (A, B, C).                                           |
| `dcredit=N`        | Requires a minimum number of digits (numbers).                   | `dcredit=1` means at least one number (0-9).                                                         |
| `ocredit=N`        | Requires a minimum number of other symbols (special characters). | `ocredit=1` means at least one symbol like @, #, !, $, %, etc.                                       |
| `maxrepeat=N`      | Prevents more than N consecutive repeating characters.           | `maxrepeat=3` means you cannot have aaaa (four a's in a row).                                        |
| `enforce_for_root` | Forces the root administrator to also follow these rules.        | Without this, the root user could set weak passwords even if everyone else has to follow the policy. |

---

## Step 5: Putting It All Together

After adding the desired arguments, the modified line might look like this:

```text
password requisite pam_pwquality.so try_first_pass local_users_only retry=3 authtok_type= minlen=12 lcredit=1 ucredit=1 dcredit=1 ocredit=1 maxrepeat=3 enforce_for_root
```

### What this line now enforces:

| Requirement                      | Setting                                            |
| -------------------------------- | -------------------------------------------------- |
| Minimum length                   | 12 characters                                      |
| Lowercase letters                | At least 1                                         |
| Uppercase letters                | At least 1                                         |
| Numbers                          | At least 1                                         |
| Special symbols                  | At least 1 (like @, #, !)                          |
| Consecutive repeating characters | No more than 3 in a row (aaa is okay, aaaa is not) |
| Root user enforcement            | Must follow all rules                              |

---

## Step 6: Save and Test

1. **Save the file and exit the editor.**
   - In `vim`: press `Esc`, then type `:wq` and press `Enter`
   - In `nano`: press `Ctrl + O`, then `Enter`, then `Ctrl + X`

2. **Test the changes** by trying to change a password (either your own or a test user).

3. **If the rules are too strict or you encounter issues**, you can restore the original file:

```bash
sudo cp /etc/pam.d/system-auth.original /etc/pam.d/system-auth
```

## Putting It All Together: Enforcing a Strong Password Policy

Now let’s walk through a **real-world example** of configuring a password complexity policy.

### The Goal

We want to enforce that **every new password** must meet these requirements:

| Requirement                                     | Setting                                         |
| ----------------------------------------------- | ----------------------------------------------- |
| Minimum length                                  | **15 characters**                               |
| At least one lowercase letter                   | Yes                                             |
| At least one uppercase letter                   | Yes                                             |
| At least one digit (number)                     | Yes                                             |
| At least one symbol (e.g., `@`, `#`, `!`)       | Yes                                             |
| No more than 3 identical consecutive characters | Yes (e.g., `aaa` is allowed, but `aaaa` is not) |

---

### Understanding the "Credit" Settings: Negative vs Positive

You’ll notice in the examples that some settings use **negative numbers** like `lcredit=-1` instead of `lcredit=1`. This is an important distinction:

| Value                                    | Meaning                                                                                                                                                                     |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Positive number** (e.g., `lcredit=1`)  | The password must contain **at least** that many lowercase letters, **but** it can also have _extra_ credits if the password is longer. The system allows some flexibility. |
| **Negative number** (e.g., `lcredit=-1`) | The password must contain **at least** that many lowercase letters, **and** no additional credit is given for extra length. This is a **strict** requirement.               |

> **In plain English:** Using negative numbers (`-1`) makes the rule a hard minimum. Using positive numbers (`1`) still requires at least one, but allows the password to be considered stronger if it exceeds the minimum. For strict enforcement, administrators often use negative values.

In our example, we’re using `-1` for all credit settings, meaning **strict enforcement** of at least one of each character type.

---

## Method 1: Modifying the PAM Module Line

This method involves editing the `/etc/pam.d/system-auth` file and adding the rules directly to the `pam_pwquality.so` line.

### Step-by-Step

1. **Open the file** with administrator privileges:

   ```bash
   sudo vim /etc/pam.d/system-auth
   ```

2. Locate the existing line containing pam_pwquality.so. It likely looks like this:

   ```text
   password requisite pam_pwquality.so try_first_pass local_users_only retry=3 authtok_type=
   ```

3. Modify the line by adding the desired arguments at the end. The updated line should look like this:

   ```text
   password requisite pam_pwquality.so try_first_pass local_users_only retry=3 authtok_type= minlen=15 lcredit=-1 ucredit=-1 dcredit=-1 ocredit=-1 maxrepeat=3
   ```

4. Save and exit:
   - Press `Esc` to exit insert mode.
   - Type `:wq` and press `Enter`.

---

## What Each Argument Does (Recap)

| Argument    | Value | Meaning                                       |
| ----------- | ----- | --------------------------------------------- |
| `minlen`    | 15    | Password must be at least 15 characters long. |
| `lcredit`   | -1    | At least one lowercase letter (strict).       |
| `ucredit`   | -1    | At least one uppercase letter (strict).       |
| `dcredit`   | -1    | At least one digit (strict).                  |
| `ocredit`   | -1    | At least one special symbol (strict).         |
| `maxrepeat` | 3     | No more than 3 identical characters in a row. |

> **Note on Negative Values:** Using `-1` instead of `1` enforces strict requirements. A positive value (like `1`) requires _at least_ that many characters, while a negative value (like `-1`) enforces the requirement _strictly_ and also disables any default leniency that might otherwise apply.

## Method 2: Modifying the `pwquality.conf` File

This method achieves the same result but uses a separate configuration file. Some administrators prefer this because it keeps all password quality rules in one place.

---

### Step-by-Step

1. **Open the configuration file with administrator privileges:**

```bash
sudo vim /etc/security/pwquality.conf
```

2. Locate the settings you want to change. They may be commented out (with a # at the beginning of the line). You need to:
   - Uncomment each line by removing the `#`
   - Update the values to match your desired policy

3. Modify the file so it contains these lines:

| Setting     | Value | Meaning                                       |
| ----------- | ----- | --------------------------------------------- |
| `minlen`    | `15`  | Password must be at least 15 characters long. |
| `lcredit`   | `-1`  | At least one lowercase letter (strict).       |
| `ucredit`   | `-1`  | At least one uppercase letter (strict).       |
| `dcredit`   | `-1`  | At least one digit (strict).                  |
| `ocredit`   | `-1`  | At least one special symbol (strict).         |
| `maxrepeat` | `3`   | No more than 3 identical characters in a row. |

4. Save and exit:
   - Press `Esc` to exit insert mode.
   - Type `:wq` and press `Enter`.

## Important Note About `pwquality.conf`

When you configure rules in `/etc/security/pwquality.conf`, they apply **globally** to any PAM module that uses `pam_pwquality.so`. This means you don't need to add arguments to the `system-auth` line—the module will automatically read the settings from this file.

However, if you do add arguments in both places, the **command-line arguments in `system-auth` will override** the settings in `pwquality.conf`.

## Comparing the Two Methods

| Method             | File Edited                    | Best For                                                                  |
| ------------------ | ------------------------------ | ------------------------------------------------------------------------- |
| Module Arguments   | `/etc/pam.d/system-auth`       | Quick, one-off changes; overriding global settings for specific services. |
| Configuration File | `/etc/security/pwquality.conf` | Centralized management; keeping all password rules in one place.          |

Both methods are valid. Choose the one that makes the most sense for your environment.

---

## Testing Your Configuration

After making changes, it's important to verify that the policy is working as expected.

---

## Test with a Regular User

1. Log in as a regular user (or use the `su` command to switch to one).
2. Run the `passwd` command to change the password.
3. Try setting a password that violates the rules (e.g., a short password, one without a number, etc.).

The system should reject the weak password with an error message explaining why.

---

## Test with Root User (If `enforce_for_root` Is Set)

If you added `enforce_for_root` to the module line, even the root user must follow the rules. Test this by:

1. Running `sudo passwd <username>` (or just `passwd` for root's own password).
2. Attempting to set a weak password.

The system should reject it just as it would for a regular user.

---

## Summary

You now have two ways to enforce a strong password policy:

| Method       | Location                                                                 |
| ------------ | ------------------------------------------------------------------------ |
| **Method 1** | Add arguments to the `pam_pwquality.so` line in `/etc/pam.d/system-auth` |
| **Method 2** | Set values in `/etc/security/pwquality.conf`                             |

In both cases, the example policy requires:

| Requirement                                        | Setting       |
| -------------------------------------------------- | ------------- |
| ✅ At least 15 characters                          | `minlen=15`   |
| ✅ At least one lowercase letter                   | `lcredit=-1`  |
| ✅ At least one uppercase letter                   | `ucredit=-1`  |
| ✅ At least one digit                              | `dcredit=-1`  |
| ✅ At least one symbol                             | `ocredit=-1`  |
| ✅ No more than 3 consecutive repeating characters | `maxrepeat=3` |

These rules significantly increase password strength, making it much harder for attackers to guess or brute-force user credentials.

## Testing the Password Enforcement Policy

After configuring the password complexity rules, it’s important to **test** them to ensure they’re working as expected. This section walks through testing from two perspectives:

1. **A regular (non-root) user**
2. **The root user** (after enabling enforcement for privileged accounts)

---

### Testing as a Regular User

When a **non-root user** tries to change their password, the complexity rules should be enforced immediately. Let’s walk through an example using a user named `amos`.

#### Attempt 1: Using a Weak Password

```bash
[amos@cent7 ~]$ passwd
Changing password for user amos.
Changing password for amos.
(current) UNIX password:
New password: BAD PASSWORD: The password is too similar to the old one
New password: BAD PASSWORD: The password is too similar to the old one
New password:
```

---

## What's Happening Here?

| Step                                                       | Explanation                                                                                                                |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `passwd`                                                   | The user runs the command to change their password.                                                                        |
| `(current) UNIX password:`                                 | The system asks for the current password to verify the user's identity.                                                    |
| `New password:`                                            | The user enters a new password that violates the complexity rules.                                                         |
| `BAD PASSWORD: The password is too similar to the old one` | The system rejects it because it's too similar to the previous password (one of the similarity checks we covered earlier). |

The system will keep rejecting weak passwords until the user enters one that meets all the complexity requirements.

---

## Attempt 2: Using a Strong Password

Eventually, the user tries a password that meets all the rules:

```bash
[amos@cent7 ~]$ passwd
Changing password for user amos.
Changing password for amos.
(current) UNIX password: password
New password: MyP@ssw0rdNEwonE
Retype new password: MyP@ssw0rdNEwonE
passwd: all authentication tokens updated successfully.
[amos@cent7 ~]$
```

---

## What's Happening Here?

| Step                                                      | Explanation                                                               |
| --------------------------------------------------------- | ------------------------------------------------------------------------- |
| `MyP@ssw0rdNEwonE`                                        | The user enters a strong password that meets all complexity requirements. |
| `Retype new password:`                                    | The system asks for confirmation to ensure no typos.                      |
| `passwd: all authentication tokens updated successfully.` | The password is accepted and saved.                                       |

---

## Why Does This Password Work? Let's Break It Down:

| Requirement                                  | How `MyP@ssw0rdNEwonE` Meets It   |
| -------------------------------------------- | --------------------------------- |
| 15+ characters long                          | ✓ 15+ characters                  |
| Contains uppercase                           | ✓ M, P, N, E                      |
| Contains lowercase                           | ✓ y, s, s, w, o, r, d, w, o, n, e |
| Contains digits                              | ✓ 0                               |
| Contains symbols                             | ✓ @                               |
| No more than 3 repeating characters in a row | ✓ No repeating sequences          |

---

## Important Limitation: Root User Exemption

By default, the password complexity rules **do not apply** to the root user or any user with `sudo` privileges. This is a security consideration—administrators need to be able to recover systems even if password policies become too restrictive.

### What this means:

If you’re logged in as root or using sudo, you can set any password, even one that violates all the complexity rules you just configured.

```bash
[root@cent7 ~]# passwd amos
Changing password for user amos.
New password: 123
Retype new password: 123
passwd: all authentication tokens updated successfully.
```

The above command would succeed even though 123 is clearly a very weak password.

---

## Enforcing Complexity for Root Users

If you want everyone—including the root user and other privileged accounts—to follow the same password complexity rules, you need to add the `enforce_for_root` option.

---

### Step-by-Step Configuration

1. **Open the PAM configuration file:**

```bash
sudo vim /etc/pam.d/system-auth
```

Locate the `pam_pwquality.so` line and add `enforce_for_root` at the end:

```text
password requisite pam_pwquality.so try_first_pass local_users_only retry=3 authtok_type= minlen=15 lcredit=-1 ucredit=-1 dcredit=-1 ocredit=-1 maxrepeat=3 enforce_for_root
```

3. Save and exit (`Esc` then `:wq`).

### What `enforce_for_root` Does

| Without `enforce_for_root`                   | With `enforce_for_root`                                     |
| -------------------------------------------- | ----------------------------------------------------------- |
| Root can set any password                    | Root must follow the same complexity rules as regular users |
| Privileged accounts bypass security policies | All accounts are held to the same security standard         |

---

## Testing Root Password Complexity

After adding `enforce_for_root`, test it by trying to set a weak password for a user while logged in as root.

### Attempt 1: Using a Weak Password (Rejected)

```bash
[root@cent7 ~]# passwd amos
Changing password for user amos.
New password: BAD PASSWORD: The password contains less than 1 digits
New password: BAD PASSWORD: The password is shorter than 15 characters
New password: BAD PASSWORD: The password contains less than 1 uppercase letters
passwd: Have exhausted maximum number of retries for service
[root@cent7 ~]#
```

### What's Happening Here?

| Message                                                             | What It Means                                                |
| ------------------------------------------------------------------- | ------------------------------------------------------------ |
| `BAD PASSWORD: The password contains less than 1 digits`            | The password had no numbers (`dcredit=-1` failed).           |
| `BAD PASSWORD: The password is shorter than 15 characters`          | The password was too short (`minlen=15` failed).             |
| `BAD PASSWORD: The password contains less than 1 uppercase letters` | The password had no uppercase letters (`ucredit=-1` failed). |
| `passwd: Have exhausted maximum number of retries for service`      | The user (root) used up all 3 allowed attempts (`retry=3`).  |

The system rejected the weak password just as it would for a regular user.

---

## Attempt 2: Using a Strong Password (Accepted)

```bash
[root@cent7 ~]# passwd amos
Changing password for user amos.
New password: MyP@ssw0rdNEwonE
Retype new password: MyP@ssw0rdNEwonE
passwd: all authentication tokens updated successfully.
[root@cent7 ~]#
```

---

## Testing Scenarios

| Scenario                           | Without `enforce_for_root` | With `enforce_for_root` |
| ---------------------------------- | -------------------------- | ----------------------- |
| Regular user tries weak password   | ❌ Rejected                | ❌ Rejected             |
| Regular user tries strong password | ✅ Accepted                | ✅ Accepted             |
| Root user tries weak password      | ✅ Accepted                | ❌ Rejected             |
| Root user tries strong password    | ✅ Accepted                | ✅ Accepted             |

## Disabling Password Reuse Using the `pwhistory` PAM Module

Even if users create strong passwords, they might try to **recycle** old passwords to avoid remembering something new. For example, a user might rotate between `Summer2024`, `Fall2024`, and `Winter2024`—defeating the purpose of regular password changes.

To prevent this, we use another PAM module called **`pam_pwhistory.so`**.

---

### What Does `pam_pwhistory.so` Do?

Think of this module as a **memory bank** for passwords. Every time a user changes their password, the module:

1. **Saves** the password in a hidden history file
2. **Checks** new passwords against the saved history
3. **Rejects** any password that matches a previously used one

This forces users to create **truly new** passwords instead of recycling old favorites.

| Concept                | Plain English Analogy                                                  |
| ---------------------- | ---------------------------------------------------------------------- |
| **Password History**   | A list of the last few passwords you’ve used                           |
| **`pam_pwhistory.so`** | The security guard who checks that list before allowing a new password |
| **`remember`**         | How many old passwords the system should keep on file                  |

---

### Configuration Example: Preventing Reuse of 12 Previous Passwords

Let’s walk through a scenario where we configure the system to **remember the last 12 passwords** for each user and prevent them from being reused.

#### Step-by-Step Configuration

1. **Open the PAM configuration file** with administrator privileges:

   ```bash
   sudo vim /etc/pam.d/system-auth
   ```

2. Locate the first password requisite line (the one containing pam_pwquality.so). Immediately after that line, add a new line for the history module:
   ```text
   password requisite pam_pwhistory.so debug use_authtok remember=12 retry=3 enforce_for_root
   ```
3. Save and exit (`Esc` then `:wq`).

## Understanding the Options

| Option             | Value      | What It Does                                                                                                                                                                                   |
| ------------------ | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `debug`            | (no value) | Turns on debugging logs. This sends detailed information to the system log (`/var/log/secure`) to help troubleshoot issues. In production, you may want to remove this to reduce log noise.    |
| `use_authtok`      | (no value) | Tells the module to accept the password that was already validated by previous modules (like `pam_pwquality.so`). This ensures the password only needs to be typed once and then passed along. |
| `remember=12`      | 12         | Remembers the last 12 passwords for each user. If a user tries to reuse any of these 12, the password is rejected. The default is 10 if not specified.                                         |
| `retry=3`          | 3          | Allows the user up to 3 attempts to enter a valid password before returning an error.                                                                                                          |
| `enforce_for_root` | (no value) | Applies the history check to the root user as well. Without this, root could bypass the password reuse restriction.                                                                            |

---

## How the Password History Works

When a user changes their password:

1. The `pam_pwquality.so` module first checks complexity (length, character types, etc.)
2. Then `pam_pwhistory.so` checks history (has this password been used before?)
3. If both checks pass, the password is saved and added to the user's history list
4. The oldest password is dropped from the list to make room for the newest one

> **Important:** The history is stored per user in a file called `/etc/security/opasswd`. This file contains old passwords in an encrypted format.

---

## Testing the Password History Policy

Let's test the configuration using a user named `amos`.

---

### First Password Change (Accepted)

The user sets a brand new password that meets all complexity rules:

```bash
[root@cent7 ~]# passwd amos
Changing password for user amos.
New password: ruIcWocFufPhij#1
Retype new password: ruIcWocFufPhij#1
passwd: all authentication tokens updated successfully.
[root@cent7 ~]#
```

**Result:** ✅ Password accepted and saved to history.

---

### Second Password Change (Attempting to Reuse)

Now the user tries to change their password again—this time attempting to reuse the same password from the previous change:

```bash
[root@cent7 ~]# passwd amos
Changing password for user amos.
New password:
Retype new password: Password has been already used. Choose another.
passwd: Authentication token manipulation error
[root@cent7 ~]#
```

## What's Happening Here?

| Message                                           | Meaning                                                                                                     |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `New password:`                                   | User enters the password (hidden for security)                                                              |
| `Retype new password:`                            | User confirms the password                                                                                  |
| `Password has been already used. Choose another.` | The `pam_pwhistory.so` module detected that this password exists in the user's history list and rejected it |
| `passwd: Authentication token manipulation error` | The password change failed because the history check was not satisfied                                      |

**Result:** ❌ Password rejected because it was used before.

---

## Why the Order Matters

Notice that we added the `pam_pwhistory.so` line **after** the `pam_pwquality.so` line:

```text
password requisite pam_pwquality.so ...   # Check complexity FIRST
password requisite pam_pwhistory.so ...   # Check history SECOND
```

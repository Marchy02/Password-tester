# Password Tester

Web application and Python script to evaluate password strength.
The tool analyzes password complexity and provides a **theoretical estimate** of the time required to crack it using brute-force attacks.

## Quick Start

### Web Version (recommended)

No installation required.

👉 **Official site:** [https://marchy02.github.io/Password-tester/](https://marchy02.github.io/Password-tester/)

1. Open the project GitHub Pages website
2. Use the web interface directly from your browser

The password is analyzed entirely client-side and never leaves your device.

### Python Version (CLI)

Use this only if you prefer working from the terminal.

**Requirements (Linux)**

```bash
sudo apt update
sudo apt install -y git python3 python3-pip
```

**Clone the repository**

```bash
git clone https://github.com/Marchy/password-tester.git
cd password-tester
```

**Install dependencies and run**

```bash
pip install --user rich
python3 password_tester.py
```

## Web Version

The web version is instant and requires no setup.

1. Enable GitHub Pages via **Settings > Pages** in the repository
2. Or open the `index.html` file directly in your browser

**Privacy:** analysis is entirely local. Your password **is not sent or stored**.

## Python Version

For command-line usage.

1. Install the dependency for terminal output:

```bash
pip install rich
```

2. Run the program:

```bash
python password_tester.py
```

## Project Structure

* `index.html` — Web interface
* `style.css` — Styles
* `script.js` — Password analysis logic (JavaScript)
* `password_tester.py` — Original Python version

## Features

* Checks password requirements (uppercase, lowercase, numbers, symbols)
* Cracking time estimation based on entropy and character set
* Common password detection
* Fully offline execution

---

Made by Marchy

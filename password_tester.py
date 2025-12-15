from rich import print 

def there_is_an_uppercase(psw):
    for caratteri in psw:
        if caratteri.isupper():
            return True
    return False

def there_is_a_lowercase(psw):
    for caratteri in psw:
        if caratteri.islower():
            return True
    return False

def min_carateri(password):
    
    if len(password) < 8:
        return False
    else: 
        return True

def there_is_a_number(psw):

    for caratteri in psw:
        if caratteri in "1234567890":
            return True
            
    return False 

def there_is_a_special_caracter(psw):
    
    for caratteri in psw: 
        if caratteri in "!""£%&/()=?^*°#@|$§{[}]~€&":
            return True
    
    return False 

def is_password_common(psw):

    password_comuni = []

    with open("./100k-most-used-passwords-NCSC.txt", "r") as file:

        for riga in file.readlines():
            
            temp= riga.strip().lower()

            password_comuni.append(temp)


    if psw.lower() in password_comuni:
        return True
    

    return False 

    
def count_special_caracters(psw):

    count_special_caracters = 0

    for carattere in psw:
        if carattere in "!""£%&/()=?^*°#@|$§{[}]~€&":
            count_special_caracters += 1 
       
    if count_special_caracters == len(psw):
        return True
    else:
        return False
    
def count_minuscole(psw):

    count_minuscole = 0

    for carattere in psw:
        if carattere.islower():
            count_minuscole += 1 
       
    if count_minuscole == len(psw):
        return True
    else:
        return False
    
def count_maiuscole(psw):

    count_maiuscole = 0

    for carattere in psw:
        if carattere.isupper():
            count_maiuscole += 1 
       
    if count_maiuscole == len(psw):
        return True
    else:
        return False


def time_to_crack(psw):

    base = 0

    is_num_presente = there_is_a_number(psw) 
    is_minuscola_presente = there_is_a_lowercase(psw)
    is_maiuscola_presente = there_is_an_uppercase(psw)
    is_speciale_presente = there_is_a_special_caracter(psw)
    

    if is_num_presente and is_minuscola_presente and is_maiuscola_presente and is_speciale_presente:
        base = 94 

    elif is_minuscola_presente and is_maiuscola_presente and is_num_presente:
        base = 62 # 26 (m) + 26 (M) + 10 (N)
        
    elif is_minuscola_presente and is_maiuscola_presente:
        base = 52 # 26 (m) + 26 (M)
        
    elif is_num_presente:
        base = 10 
    elif is_minuscola_presente or is_maiuscola_presente:
        base = 26
    elif is_speciale_presente:
        base = 32


    

    n_combinazini = pow(base, len(psw))

    # Velocità di attacco al secondo (quello che riesce a fare un pc buono oggi secondo gemini )
    tentativi_al_secondo = 100000000000


    secondi = n_combinazini / tentativi_al_secondo
    
    
    minuti = secondi / 60
    ore = minuti / 60
    giorni = ore / 24
    anni = giorni / 365
    secoli = anni / 100
    millenni = anni / 1000
    milioni_anni = anni / 1000000
    miliardi_anni = anni / 1000000000

    # Restituiamo il tempo nel formato più appropriato
    if miliardi_anni >= 1:
        return f"{int(miliardi_anni)} miliardi di anni"
    elif milioni_anni >= 1:
        return f"{int(milioni_anni)} milioni di anni"
    elif millenni >= 1:
        return f"{int(millenni)} millenni"
    elif secoli >= 1:
        return f"{int(secoli)} secoli"
    elif anni >= 1:
        return f"{int(anni)} anni"
    elif giorni >= 1:
        return f"{int(giorni)} giorni"
    elif ore >= 1:
        return f"{int(ore)} ore"
    elif minuti >= 1:
        return f"{int(minuti)} minuti"
    else:
        return f"{int(secondi)} secondi"



def main():
# Titolo 

    print("\n\n\n")
    print("[green]#####################################################[/green]")
    print("[green]                 Password Tester                     [/green]")
    print("[green]#####################################################\nby Marchy\n\n\n[/green]")
    print("\n[yellow]I requisiti minimi sono: 8 caratteri, 1 maiuscola, 1 numero e 1 simbolo.[/yellow]\n\n")

    password = ""

    while password == "" : 
        password = input("Inserire la password : ")


    tempo_crack  = time_to_crack(password)

# Check 
    
    password_is_common = is_password_common(password)
    output1 = min_carateri(password)
    output2 = there_is_a_number(password)
    output3 = there_is_a_special_caracter(password)
    output4 = there_is_an_uppercase(password)


    errori_riscontrati = []
    

    if output4 == False:
        errori_riscontrati.append("una lettera maiuscola")

    if output1 == False:
        errori_riscontrati.append("lunghezza (minimo 8 caratteri)")
    
    if output2 == False:
        errori_riscontrati.append("un numero")
        
    if output3 == False:
        errori_riscontrati.append("un carattere speciale")
        

    if password_is_common == True:
        print("\n\n[red]⚠️ ATTENZIONE: La tua password è tra le password più comunemente utilizzate.[/red]\n")

    if errori_riscontrati:

        print(f"[red]\n❌ MANCANO i seguenti requisiti:[/red]\n")

        for errore in errori_riscontrati:
            print(f"[red]  - {errore}[/red]")

    
    
    # Fine check 


    #Password sicura 

    if output1 and output2 and output3 and output4 and not password_is_common:

        print("\n\n✅ [green]Tecnicamente la tua password è forte![/green]\n\n")

        print("[yellow]⚠️ ATTENZIONE PERO': Anche se ha numeri e simboli, la tua password diventa insicura se contiene:" \
        "\n\nIl tuo nome o cognome\n" \
        "\nLa tua data di nascita\n" \
        "\nIl nome del tuo cane o della tua squadra del cuore\n" \
        "\nSe la tua password contiene una di queste cose, CAMBIALA SUBITO.[/yellow]\n")




        
    print(f"\n⏱️  Tempo stimato per crackare la password: [cyan]{tempo_crack}[/cyan]\n")







#Chiamata al main 
main()


#loop nel main 

continuare = "y"

while continuare in "Yy": 
    
    continuare = input("\nVuoi controllare un'altra password? [y/N]: ") 
    
    if continuare == "":
        continuare = "n"
    
    if continuare in "Yy":
        main()
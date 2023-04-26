import { differenceInYears } from "date-fns";

export function classificarPressaoSistolica(pressaosistolica) {
    try {
        return (pressaosistolica < 90) ? "Hipotenso" : (pressaosistolica < 130) ? "Normotenso" : (pressaosistolica < 140) ? "Normotenso Limítrofe" : (pressaosistolica < 160) ? "Hipertenso Leve" : (pressaosistolica < 180) ? "Hipertenso Moderado" : (pressaosistolica >= 180) ? "Hipertenso Grave" : "";
    }
    catch (exception) {
        return "";
    }
}
export function classificarPressaoDiastolica(pressaodiastolica) {
    try {
        return (pressaodiastolica < 60) ? "Hipotenso" : (pressaodiastolica < 85) ? "Normotenso" : (pressaodiastolica < 90) ? "Normotenso Limítrofe" : (pressaodiastolica < 100) ? "Hipertenso Leve" : (pressaodiastolica < 110) ? "Hipertenso Moderado" : (pressaodiastolica >= 110) ? "Hipertenso Grave" : "";
    }
    catch (exception) {
        return "";
    }
}
export function classificarFrequenciaCardiaca(pulsacao, dtnascimento) {
    const idade = differenceInYears(new Date(), new Date(dtnascimento));

    try {
        if (idade < 2) {
            return (pulsacao < 120) ? "Bradicárdico" : (pulsacao <= 160) ? "Normocárdico" : (pulsacao > 160) ? "Taquicárdico" : "";
        }
        else if (idade < 12) {
            return (pulsacao < 80) ? "Bradicárdico" : (pulsacao <= 130) ? "Normocárdico" : (pulsacao > 130) ? "Taquicárdico" : "";
        }
        else if (idade >= 12) {
            return (pulsacao < 60) ? "Bradicárdico" : (pulsacao <= 100) ? "Normocárdico" : (pulsacao > 100) ? "Taquicárdico" : "";

        }
        else {
            return "";
        }
    }
    catch (exception) {
        return "";
    }
}
export function classificarFrequenciaRespiratoria(respiracao) {
    try {
        return (respiracao < 14) ? "Bradipnéico" : (respiracao <= 20) ? "Eupnéico" : (respiracao > 20) ? "Taquipnéico" : "";
    }
    catch (exception) {
        return ""
    }

}

export function classificarTemperaturaCelsius(temperatura) {
    try {
        return (temperatura < 36) ? "Hipotermia" : (temperatura < 37.2) ? "Normotermia ou Afebril" : (temperatura < 37.7) ? "Estado febril/subfebril ou febrícula" : (temperatura < 38.9) ? "Febre" : (temperatura <= 40) ? "Pirexia" : (temperatura > 40) ? "Hiperpirexia" : "";
    }
    catch (exception) {
        return "";
    }
}


//"###.###.###-##" convert to ###########
export function convertCpfFormattedStringToNumber(cpf) {
    if (cpf && cpf.length === 14) {
        try {
            return Number(cpf.replaceAll('.', "").replaceAll('-', ""));
        }
        catch (exception) {

        }
    }
    return null;
}

//(##)#####-####
export function convertTelefoneFormattedStringToNumber(telefone) {
    if (telefone && telefone.length === 14) {
        try {

            return Number(telefone.replaceAll('(', "").replaceAll(')', "").replaceAll('-', ""));
        }
        catch (exception) {

        }
    }
    return null;
}

export function convertNumberToTelefoneFormattedString(telefone) {
    if (telefone && !isNaN(telefone)) {
        try {
            let telefonestring=""+telefone;
            while (telefonestring.length < 11) {
                telefonestring = "0" + telefonestring;
            }
            return "("+telefonestring.substring(0,2)+")"+telefonestring.substring(2,7)+"-"+telefonestring.substring(7,11);

        }
        catch (exception) {
            console.log(exception);
            return null;
        }
    }
    return null;
}






export function convertCpfNumberToFormattedString(cpf) {
    if (cpf && !isNaN(cpf)) {
        let cpfstring = "" + cpf;
        while (cpfstring.length < 11) {
            cpfstring = "0" + cpfstring;
        }
        //cpfstring=(cpfstring.length>3)
        return cpfstring.substring(0, 3) + "." + cpfstring.substring(3, 6) + "." + cpfstring.substring(6, 9) + "-" + cpfstring.substring(9, 11);
    }
    return null;
}

export function resultadoCovid() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const total = checkboxes.length;
    const marcados = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;
    const percentual = (marcados / total) * 100;

    if (percentual < 40) {
        return "Insuficiente";
    } else if (percentual < 60) {
        return "Potencialmente Infectado";
    } else {
        return "Possivelmente Infectado";
    }
}
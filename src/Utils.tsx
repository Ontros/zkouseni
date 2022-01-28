//2.1.2021

import FlagCZ from './cz.svg'
import FlagGB from './gb.svg'

function Lang(lang: number, array: string[]): string {
    if (array.length === 1) {
        return array[0]
    }

    var ans = array[lang]
    if (ans) {
        return ans
    }
    return "Language error"
}

interface LangProps {
    lang: number;
    setLang: (arg0: number) => void;
}
//   const [lang, setLang] = useState(detectBrowserLanguage().substring(0, 2).toLowerCase() === 'cs' ? 1 : 0) //1 = czech; 0 = english

function LanguageSelect(props: LangProps) {
    const { lang, setLang } = props

    var languages = [{
        name: 'English',
        flag: FlagGB
    },
    {
        name: 'Česky',
        flag: FlagCZ
    }
    ]

    return (
        <div className="language-selection" onClick={() => {
            setLang(lang < languages.length - 1 ? lang + 1 : 0)
        }
        }>
            <img src={languages[lang].flag} alt="Flag" className='flag' />
            {languages[lang].name}
        </div>
    )
}

//Alert api (extremly complex ;)
var chyba = (code: string) => {
    alert(`Ondřej to zase posral, tohle by mu snad mělo pomoct opravit tento problém: ${code}`)
}

export { Lang, LanguageSelect, chyba }
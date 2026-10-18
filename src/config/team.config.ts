export const TEAM_CATEGORIES = [
  { id: 'leadership', title: 'Conducere' },
  { id: 'alumni', title: 'Alumni' },
  { id: 'mecanica', title: 'Mecanică' },
  { id: 'programare', title: 'Programare' },
  { id: 'proiectare-3d', title: 'Proiectare 3D' },
  { id: 'marketing', title: 'Marketing' },
  { id: 'outreach-fundraising', title: 'Outreach & Fundraising' },
] as const

export const TEAM_LEADER_ROLE = 'Lider de echipă'

export type TeamCategoryId = (typeof TEAM_CATEGORIES)[number]['id']

export interface TeamMember {
  id: string
  name: string
  role: string
  category: TeamCategoryId
  description: string
  image?: string
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'liciu-gianina',
    name: 'Liciu-Gianina Ancuța',
    role: 'Mentor',
    category: 'leadership',
    description: 'De aproape opt ani sunt mentor pentru o echipă minunată, alături de care am trăit atât momente de bucurie, cât și provocări. Sunt profesoară de matematică la Colegiul Național „Cuza Vodă” din Huși și am învățat să-i ghidez pe elevii mei nu doar în domeniul academic, ci și în dezvoltarea lor personală. De-a lungul acestor ani, am fost martora evoluției lor, încercând să le ofer sprijin, înțelegere și răbdare, indiferent de obstacolele întâmpinate. Îmi place să cred că am reușit să creez un mediu în care fiecare elev se simte valorizat și motivat să-și depășească propriile limite. Împreună, am înfruntat schimbările și am învățat că succesul nu înseamnă doar rezultate școlare, ci și maturizare, responsabilitate și empatie. Am încurajat fiecare pas înainte și am sărbătorit fiecare reușită, oricât de mică ar fi fost. În echipa noastră, am reușit să construim nu doar o relație de încredere, ci și un adevărat spirit de colaborare, în care fiecare membru îi susține pe ceilalți. Sunt mândră de ceea ce am realizat împreună și sper ca, prin exemplul meu, să le fi insuflat elevilor curajul de a-și urma visele și de a deveni versiuni cât mai bune ale lor înșiși.',
    image: '/team/liciu.jpg',
  },
  {
    id: 'gaina-sergiu',
    name: 'Găină Sergiu',
    role: 'Mentor',
    category: 'leadership',
    description: 'Sunt mentor voluntar al acestei echipe din 2023 și am contribuit la dezvoltarea profesională și personală a membrilor ei. Mi-am pus cunoștințele tehnice în slujba echipei, ghidându-i în realizarea robotului și în depășirea provocărilor. Ce m-a motivat cu adevărat a fost simțul etic, care m-a ajutat să creez un mediu bazat pe respect reciproc. Ambiția și perseverența, trăsături ce mă definesc, au fost esențiale pentru a menține echipa unită, chiar și în momente dificile. Am fost mai mult decât un ghid tehnic – am fost un motivator și un mediator, asigurându-mă că fiecare membru s-a simțit apreciat. Abilitățile mele de a lucra cu tinerii au fost esențiale pentru a încuraja spiritul de echipă și a crea o atmosferă pozitivă. Simțul umorului a fost un instrument puternic pentru a depăși momentele stresante și a revigora echipa. Am motivat prin propriul exemplu, arătând cum fiecare obstacol poate fi o oportunitate de dezvoltare. Alături de acești tineri pasionați, am învățat ce înseamnă dedicarea, munca în echipă și sprijinul reciproc. Împreună, am construit un mediu în care fiecare a putut să crească și să contribuie.',
  },
  {
    id: 'croitoru-alexandra',
    name: 'Croitoru Alexandra',
    role: 'Mentor',
    category: 'leadership',
    description: 'Mă numesc Croitoru Alexandra, iar drumul meu în robotică a început din curiozitate și din dorința de a înțelege cum funcționează lucrurile dincolo de aparențe. Am pășit pentru prima dată în acest univers ca simplă membră a echipei, fascinată de combinația dintre tehnologie, creativitate și muncă în echipă. Astăzi, după ani de experiență și momente care m-au format, continui această poveste ca mentor al clubului, rol pe care îl ocup de aproximativ doi ani și care îmi oferă șansa de a inspira, ghida și susține o nouă generație de pasionați de robotică. Îmi place să aduc oamenii împreună și să construiesc o echipă unită, în care fiecare voce contează. Pentru mine, un club de robotică nu este doar un loc unde se scrie cod sau se asamblează mecanisme, ci un spațiu în care ideile sunt încurajate, unde greșelile devin lecții valoroase, iar provocările se transformă în oportunități de creștere. Îmi doresc ca fiecare membru să simtă că aparține echipei, că este ascultat și că poate contribui autentic la succesul comun. Robotica m-a învățat că performanța se construiește prin colaborare, perseverență și curaj. M-a învățat să am încredere în proces, să îmbrățișez eșecul ca parte firească a evoluției și să nu renunț atunci când lucrurile devin dificile. Dincolo de competiții și rezultate, pentru mine robotica înseamnă prietenii legate în nopți lungi de lucru, momente de bucurie împărtășită și visuri care prind contur prin efort comun.',
    image: '/team/alexandra.jpg',
  },
  {
    id: 'bejan-bianca',
    name: 'Bejan Bianca',
    role: 'Alumni',
    category: 'alumni',
    description: 'Mă numesc Bianca, dar mulți mă cunosc sub porecla „Morcov”, un nume ce îmi aduce mereu zâmbetul pe buze. Am făcut parte timp de patru ani din această echipă minunată, iar această experiență m-a ajutat să cresc și să descopăr mai multe despre mine și despre ceilalți. În prezent, sunt studentă la Facultatea de Drept, însă sufletul meu este în continuare alături de echipa care mi-a fost o a doua familie. Adesea, lumea mă aseamănă cu personajul „Neînfricata” și trebuie să recunosc că această comparație mă bucură nespus. Mă regăsesc în ea nu doar prin trăsăturile fizice, ci și prin personalitate. Sunt o fire energică și curajoasă, mereu gata să sar în ajutorul celor dragi. Îmi place să aduc un strop de lumină în viețile oamenilor din jur, să le ofer sprijin și să le transmit optimismul meu. În timpul liber, îmi place să evadez în lumea fascinantă a cărților. Cititul este pentru mine o poartă către universuri infinite, unde creativitatea autorilor mă captivează și mă inspiră. În tot ceea ce fac, încerc să mă ghidez după valori care îmi sunt dragi: perseverența și dorința de a avea un impact pozitiv asupra vieții celorlalți. Fiecare zi este o nouă oportunitate de a învăța, de a iubi, de a crea amintiri frumoase și de a lăsa o mică urmă de bine în lume.',
    image: '/team/bianca.jpg',
  },
  {
    id: 'malanca-stefan',
    name: 'Malanca Ștefan',
    role: 'Alumni',
    category: 'alumni',
    description: 'Numele meu este Ștefan.Povestea mea cu robotica a început încă din copilărie, când tatăl meu m-a rugat să îl ajut să schimbe o piesă la mașină. Deși părea o sarcină banală, acel moment a fost pentru mine o revelație. Am descoperit o lume fascinantă, care m-a captivat pe loc. Cu entuziasm și curiozitate, am început să mă informez singur, să învăț și să experimentez. Această pasiune m-a însoțit ani de-a rândul, iar când am intrat la liceu și am aflat despre echipa de robotică, nu am stat prea mult pe gânduri – m-am înscris imediat. De-a lungul celor patru sezoane în care am făcut parte din echipă, am trăit experiențe extraordinare care m-au ajutat să cresc atât ca persoană, cât și ca membru al unui grup. Mi-am dezvoltat abilitățile de colaborare și am învățat ce înseamnă să lucrăm împreună pentru un scop comun. Energia, curajul și ambiția mea s-au îmbinat perfect cu munca în echipă, iar eforturile depuse au condus la rezultatele la care visam. Pentru mine, robotica nu înseamnă doar tehnologie sau competiții. Este o călătorie plină de provocări și satisfacții, o șansă de a inova și de a da viață ideilor alături de oameni pasionați. Privind înapoi, sunt recunoscător pentru fiecare pas pe care l-am făcut și privesc cu entuziasm spre viitor, știind că drumul meu abia începe.',
    image: '/team/stefan.jpg',
  },
  {
    id: 'moisa-tudor',
    name: 'Moisă Tudor Constantin',
    role: 'Alumni',
    category: 'alumni',
    description: 'Mă numesc Tudor Moisă.Pasiunea mea pentru mecanică și proiectare s-a dezvoltat încă din copilărie, pornind de la curiozități simple și transformându-se într-o dorință de a crea și de a înțelege lumea din jur. Această pasiune a fost unul dintre motivele principale pentru care m-am alăturat echipei de robotică, un mediu în care am putut învăța, colabora și pune în aplicare idei inovatoare. Am studiat pianul timp de șapte ani, o experiență care m-a ajutat să-mi dezvolt răbdarea, atenția la detalii și gândirea creativă, calități esențiale în robotică. Deși domeniile sunt diferite, atât muzica, cât și mecanica necesită disciplină, perseverență și o abordare creativă pentru a atinge performanțe. În timpul liber, îmi place să petrec timp cu prietenii, iar timpul petrecut împreună mă ajută să mă relaxez și să îmi reîncarc energia. Intrarea în echipa de robotică a fost un pas natural, care mi-a oferit șansa de a învăța lucruri noi și de a lucra cu oameni care împărtășesc aceeași pasiune pentru inovație. Sunt recunoscător pentru această oportunitate și pentru tot ce am construit alături de echipă.',
    image: '/team/tudor.jpg',
  },
  {
    id: 'balint-francesca',
    name: 'Balint Maria-Francesca',
    role: TEAM_LEADER_ROLE,
    category: 'leadership',
    description: 'Cel mai frecvent răspuns la întrebarea „Ce faci?” este „Sunt la robo”. Am petrecut atât de mult timp la robotică, încât nu o mai numesc a doua casă, ci prima. Pentru mine, echipa de robotică reprezintă o experiență absolut minunată. Înseamnă familie, competiții, nopți nedormite și amintiri care vor dura o viață.',
    image: '/team/francesca.jpg',
  },
  {
    id: 'popovici-casian',
    name: 'Popovici Victor-Casian',
    role: 'Mecanică',
    category: 'mecanica',
    description: 'Mă numesc Popovici Casian și sunt elev la Colegiul Național „Cuza Vodă” și fac parte din departamentul de mecanică al echipei Quasar Robotics. Anii petrecuți în echipă reprezintă pentru mine o etapă importantă de formare, în care pasiunea pentru domeniul tehnic s-a îmbinat cu dorința constantă de evoluție. Activitatea în departamentul de mecanică îmi oferă ocazia să îmi folosesc imaginația într-un mod concret și aplicat. Consider că imaginația este esențială în gândirea inginerească, deoarece îmi permite să privesc dincolo de o simplă piesă și să anticipez modul în care fiecare element contribuie la funcționarea întregului sistem. Îmi place să transform schițele și ideile în structuri reale, stabile și eficiente, care prind viață prin muncă și atenție la detalii. Sunt o persoană dornică să învețe și să se perfecționeze constant. Fiecare provocare tehnică este pentru mine o oportunitate de a descoperi soluții noi, de a experimenta și de a-mi depăși limitele. Cred că progresul nu vine din rezultate imediate, ci din perseverență, disciplină și colaborare strânsă cu echipa. Pentru mine, robotica înseamnă construcție, viziune și muncă în echipă. Îmi doresc să contribui la obținerea unor rezultate din ce în ce mai bune, alături de colegii mei, prin implicare, seriozitate și dorința sinceră de a evolua împreună.',
    image: '/team/casian.jpg',
  },
  {
    id: 'craciun-elisabeta',
    name: 'Crăciun Elisabeta',
    role: 'Mecanică',
    category: 'mecanica',
    description: 'Îmi place să comunic cu oamenii, să îmi fac prieteni și să fiu deschisă la experiențe noi. Sunt o persoană destul de vorbăreață. Îmi place să glumesc și să-i fac pe cei din jur să se simtă bine în preajma mea. Când nu sunt la robotică, îmi place să ies la plimbare, să ascult muzică și să petrec timp cu prietenii. La robotică, îmi place faptul că pot învăța lucruri noi și că mă aflu într-un mediu în care mă simt confortabilă, deoarece pot să-mi exprim liber ideile și să lucrez în echipă.',
    image: '/team/elisabeta.jpg',
  },
  {
    id: 'neagu-stefania',
    name: 'Neagu Ștefania',
    role: 'Mecanică',
    category: 'mecanica',
    description: 'Bună! Sunt o persoană curioasă, creativă și mereu dornică să învăț lucruri noi. Îmi place să descopăr idei interesante, să găsesc soluții la provocări și să lucrez în echipă. Sunt pregătită să-mi pun imaginația la treabă, să experimentez și să transform ideile în ceva real.',
    image: '/team/stefania.jpg',
  },
  {
    id: 'stejar-alexandru',
    name: 'Stejar Alexandru-George',
    role: 'Mecanică',
    category: 'mecanica',
    description: 'Sunt pasionat de robotică și tehnologie, iar în cadrul echipei mă ocup de partea tehnică alături de colegii mei. Îmi place să construiesc, să găsesc soluții la probleme tehnice și să contribui la dezvoltarea robotului. Cu fiecare proiect, îmi dezvolt abilitățile și acumulez experiență, lucrând împreună cu echipa pentru a ne atinge obiectivele.',
    image: '/team/stejar.jpg',
  },
  {
    id: 'mik-bogdan',
    name: 'Mik Bogdan',
    role: 'Programare',
    category: 'programare',
    description: 'Sunt programator într-o echipă de robotică FTC și sunt pasionat de tehnologie și programare, precum și de modul în care funcționează lucrurile. M-am alăturat echipei de robotică în primul rând din curiozitate și din dorința de a învăța lucruri noi, dar și pentru oportunitatea de a participa la competiții și de a lucra în echipă. În cadrul echipei mă ocup de programarea robotului, testarea codului și îmbunătățirea modului în care acesta funcționează. În timpul pregătirii pentru competiții, lucrăm mult la optimizarea codului, la testarea diferitelor strategii și la rezolvarea problemelor care apar pe parcurs. De multe ori este nevoie de multă răbdare și de multe teste până când robotul funcționează exact cum trebuie. Prin robotică am reușit să învăț mai multe despre programare, electronică și despre cum se dezvoltă un proiect tehnic într-o echipă. În timpul liber îmi place să mai lucrez la proiecte legate de programare, să învăț lucruri noi din domeniul tehnologiei sau să experimentez cu diferite idei. În același timp, îmi place să mă relaxez jucând jocuri video sau practicând alte activități recreative.',
    image: '/team/bogdi.jpg',
  },
  {
    id: 'mardare-denis',
    name: 'Mardare Denis-Teodor',
    role: 'Programare',
    category: 'programare',
    description: 'Mă numesc Mardare Denis-Teodor.Pasiunea mea pentru programare a început din dorința de a înțelege cum funcționează tehnologia din jurul meu. La început, eram curios să aflu cum sunt create aplicațiile și jocurile, iar apoi am început să învăț singur și să fac mici proiecte. Programarea m-a ajutat să îmi dezvolt gândirea logică, răbdarea și atenția la detalii. Îmi place să caut soluții la probleme și să îmbunătățesc ceea ce creez. Consider că fiecare greșeală este o oportunitate de a învăța ceva nou. Sunt interesat și de robotică, deoarece aceasta îmbină programarea cu partea practică. Îmi place ideea de a scrie cod care controlează un robot sau un sistem real. Robotica mă ajută să înțeleg mai bine cum funcționează atât partea software, cât și cea hardware. În timpul liber, continui să învăț și să exersez programarea, deoarece îmi doresc să devin tot mai bun în acest domeniu. Îmi place să lucrez atât individual, cât și în echipă. Sunt deschis să învăț lucruri noi de la cei din jurul meu. Pe viitor, îmi doresc să urmez o carieră în IT și să lucrez la proiecte care pot fi utile oamenilor.',
    image: '/team/denis.jpg',
  },
  {
    id: 'tirdea-alexandru',
    name: 'Țîrdea Alexandru',
    role: 'Programare',
    category: 'programare',
    description: 'Salut! Sunt Alex și mă consider o persoană amuzantă și generoasă. Îmi place robotica pentru că, pe lângă faptul că pot să fac ceea ce îmi place, interacționez cu persoane la fel de interesate ca mine.',
    image: '/team/tirdea.jpg',
  },
  {
    id: 'filip-tudor',
    name: 'Filip Tudor-Andrei',
    role: 'Proiectare 3D',
    category: 'proiectare-3d',
    description: 'Pentru mine, modelul din Onshape nu este doar o imagine pe un monitor, ci un portal prin care ideile mele prind viață. Privesc modelul la care am lucrat ore întregi, verific fiecare milimetru și abia aștept să-l trimit la imprimantă, ca să văd cum piesa prinde formă, strat cu strat, din filament. Magia începe cu adevărat când îmbin piesele 3D cu motoarele, axele și placa de dezvoltare, iar robotul meu face primii pași pe cont propriu. Uneori, piesele nu se potrivesc din prima sau un servomotor refuză să funcționeze, dar fiecare greșeală este doar un puzzle pe care abia aștept să-l rezolv. În atelier, printre role de PLA, șuruburi M3 și zgomotul ritmic al imprimantei, mă simt ca un constructor al viitorului. Nu construiesc doar jucării din plastic și metal, ci învăț încă de pe acum să creez lucruri care, într-o zi, ar putea schimba lumea. Pentru mine, robotica și proiectarea 3D nu reprezintă doar un hobby, ci cel mai frumos mod de a-mi transforma imaginația în realitate.',
    image: '/team/filip.jpg',
  },
  {
    id: 'liciu-radu',
    name: 'Liciu Radu Andrei',
    role: 'Proiectare 3D / Driver',
    category: 'proiectare-3d',
    description: 'Numele meu este Liciu Radu.Fac parte din echipa de robotică a orașului meu, unde sunt proiectant 3D și driver al robotului. Sunt pasionat de mecanică și de procesul prin care o idee devine un mecanism real, funcțional și eficient. Ca proiectant, mă concentrez pe soluții simple, rezistente și bine optimizate. Am îndemânare tehnică și atenție la detalii, iar pentru mine fiecare piesă trebuie să aibă un scop clar și să contribuie la performanța întregului sistem. Rolul de driver m-a ajutat să-mi dezvolt reflexele, capacitatea de a lua decizii rapide și abilitatea de a rămâne concentrat sub presiune. Consider că disciplina, perseverența și munca în echipă sunt esențiale pentru a obține rezultate bune într-o competiție. Pentru mine, robotica înseamnă progres continuu, inovație și dorința de a deveni mai bun cu fiecare proiect și fiecare competiție.',
    image: '/team/raducu.jpg',
  },
  {
    id: 'giugaru-alexandra',
    name: 'Giugaru Alexandra Iulia',
    role: 'Marketing',
    category: 'marketing',
    description: 'Mă numesc Alexandra și sunt o persoană creativă, ambițioasă și dornică să învețe lucruri noi. Îmi place să îmi pun ideile în practică, să descopăr perspective diferite și să contribui la proiecte care mă ajută să evoluez atât individual, cât și împreună cu echipa. Consider că fiecare provocare reprezintă o oportunitate de a-mi depăși limitele, de a dobândi noi cunoștințe și de a-mi dezvolta abilitățile. Pentru mine, robotica înseamnă mai mult decât tehnologie: înseamnă perseverență, creativitate și colaborare, toate unite de dorința de a transforma ideile în realitate.',
    image: '/team/giugaru.jpg',
  },
  {
    id: 'liciu-teodora',
    name: 'Liciu Teodora',
    role: 'Marketing',
    category: 'marketing',
    description: 'Sunt o persoană prietenoasă și empatică. Îmi place să lucrez în echipă și să petrec timp cu prietenii. În timpul liber, ascult muzică, mă uit la filme și petrec timp cu pisica mea. Sunt pasionată de machiaj și îmi place să încerc stiluri noi. Îmi place robotica deoarece îmi oferă ocazia să învăț lucruri noi, să fiu creativă și să lucrez alături de oameni cu aceleași interese. De asemenea, îmi plac provocările și sunt mereu curioasă să descopăr lucruri noi.',
    image: '/team/teodora.jpg',
  },
  {
    id: 'mercas-lavinia',
    name: 'Mercaș Lavinia-Elena',
    role: 'Marketing',
    category: 'marketing',
    description: 'Îmi plac oamenii cu care poți începe o conversație despre orice și poți ajunge, cumva, să discuți despre alte zece lucruri complet diferite. Cred că cele mai faine experiențe apar atunci când ești înconjurat de oameni cu care poți râde, schimba idei și învăța lucruri noi fără să simți că trebuie să demonstrezi ceva. Îmi place să lucrez în echipă tocmai pentru că fiecare vine cu perspectiva lui, iar uneori cele mai bune idei apar din discuții care încep cu „Dar dacă am încerca ceva complet diferit?” Îmi place să pun suflet în ceea ce fac, să mă bucur de lucrurile mici și să găsesc motive de râs chiar și în zilele în care pare că toate sarcinile s-au vorbit între ele ca să ne testeze răbdarea. Recunosc, îmi place și când lucrurile ies exact cum mi le-am imaginat, deși realitatea are uneori propriile planuri. Până la urmă, pentru mine, o experiență reușită nu se măsoară doar în rezultate, ci și în oamenii pe care îi întâlnești, în amintirile pe care le aduni și în glumele pe care ajungi să le explici de fiecare dată când apare cineva din afara echipei. Iar dacă la final am învățat ceva nou, am făcut o treabă bună și am râs pe parcurs, eu zic că ne-am descurcat destul de bine.',
    image: '/team/lavinia.jpg',
  },
  {
    id: 'ivan-miruna',
    name: 'Ivan Miruna Ștefania',
    role: 'Marketing',
    category: 'marketing',
    description: 'Sunt Miruna. Găsesc mereu ceva nou de descoperit, iar o conversație cu mine poate ajunge oriunde. Îmi găsesc inspirația în muzică, în oameni și, evident, în robotică.',
    image: '/team/miruna.jpg',
  },
  {
    id: 'melinte-anastasia',
    name: 'Melinte Anastasia',
    role: 'Outreach & Fundraising',
    category: 'outreach-fundraising',
    description: 'Hei! Sunt Anastasia și îmi place să cunosc oameni noi, să lucrez în echipă și să mă implic în proiecte care îmbină creativitatea cu tehnologia. Consider că robotica înseamnă mult mai mult decât construirea roboților: înseamnă colaborare, perseverență, idei împărtășite și experiențe care ne apropie. Îmi place energia din spatele fiecărui proiect și faptul că, împreună, putem transforma o pasiune comună în ceva cu adevărat special! 💗',
    image: '/team/anastasia.jpg',
  },
  {
    id: 'bejan-teodor',
    name: 'Bejan Teodor-Andrei',
    role: 'Outreach & Fundraising',
    category: 'outreach-fundraising',
    description: 'Eu sunt Teo și fac parte din departamentul de marketing și PR al echipei. Sunt o persoană deschisă și sociabilă. Îmi place să cunosc oameni noi și să ies din zona de confort ori de câte ori am ocazia. Mă implic mult în tot ceea ce fac și îmi place să învăț lucruri noi din experiențe diverse.',
    image: '/team/teodor.jpg',
  },
  {
    id: 'bahnariu-antonia',
    name: 'Bahnariu Antonia',
    role: 'Outreach & Fundraising',
    category: 'outreach-fundraising',
    description: 'Hei! Mă numesc Antonia. Îmi plac mult pisicile și îmi place să confecționez obiecte manual și să lucrez în echipă. Îmi place și să dorm, dar, când este treabă de făcut, mă implic fără ezitare. Consider că oricine poate reuși dacă își dorește.',
    image: '/team/antonia.jpg',
  },
]

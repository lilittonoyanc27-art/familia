import type { Level, P } from '../core/types';
import type { Theme } from './vocab';
export interface Phrase { es: string; ru: string; level: Level; theme: Theme }
const R = `A1|familia|Mi familia es grande.|Моя семья большая.
A1|familia|Tengo un hermano y una hermana.|У меня есть брат и сестра.
A1|familia|Mi madre se llama Elena.|Мою маму зовут Елена.
A1|casa|La cocina está al lado del salón.|Кухня рядом с гостиной.
A1|casa|El gato duerme en el sofá.|Кошка спит на диване.
A1|comida|Quiero huevos y pan.|Я хочу яйца и хлеб.
A1|comida|Yo prefiero un yogur.|Я предпочитаю йогурт.
A1|comida|¿Qué queréis desayunar?|Что вы хотите на завтрак?
A1|comida|Voy a preparar el café.|Я приготовлю кофе.
A1|compras|Tenemos que comprar comida.|Нам нужно купить продукты.
A1|compras|¿Cuánto cuesta un kilo?|Сколько стоит килограмм?
A1|compras|Estoy buscando tomates.|Я ищу помидоры.
A1|ciudad|¿Dónde está el supermercado?|Где находится супермаркет?
A1|ocio|Vamos a jugar juntos.|Давайте поиграем вместе.
A1|rutina|¿Puedes ayudarme?|Можешь мне помочь?
A1|planes|¿Qué vamos a hacer hoy?|Что мы будем делать сегодня?
A1|planes|El domingo vamos al parque.|В воскресенье мы идём в парк.
A1|escuela|¿Puedo ir al baño?|Можно выйти в туалет?
A1|escuela|No entiendo este ejercicio.|Я не понимаю это упражнение.
A1|escuela|¿Puedes repetir, por favor?|Можешь повторить, пожалуйста?
A1|escuela|¿Cómo se llama tu profesor?|Как зовут твоего учителя?
A1|tiempo|Hoy hace sol y calor.|Сегодня солнечно и жарко.
A1|tiempo|En invierno hace mucho frío.|Зимой очень холодно.
A1|ropa|Llevo una camiseta roja.|На мне красная футболка.
A1|hora|Son las tres de la tarde.|Три часа дня.
A1|hora|¿Qué hora es?|Который час?
A1|numeros|Tengo diez euros.|У меня десять евро.
A1|animales|El perro corre por el parque.|Собака бегает по парку.
A1|animales|El pájaro canta por la mañana.|Птица поёт по утрам.
A1|transporte|Mi padre tiene un coche azul.|У моего папы синяя машина.
A1|transporte|El tren sale a las ocho.|Поезд отправляется в восемь.
A1|trabajo|El médico trabaja en el hospital.|Врач работает в больнице.
A1|viajes|El hotel está cerca de la playa.|Гостиница недалеко от пляжа.
A1|rutina|Me levanto a las siete.|Я встаю в семь.
A1|bloques|Recoge cinco bloques de madera.|Собери пять блоков древесины.
A1|ocio|Es mi turno.|Моя очередь.
A1|ocio|Tira los dados.|Бросай кубики.
A1|colores|La flor es amarilla y blanca.|Цветок жёлто-белый.
A2|familia|Mis abuelos viven en un pueblo pequeño.|Мои бабушка и дедушка живут в маленькой деревне.
A2|familia|Mi tía es más joven que mi padre.|Моя тётя моложе моего папы.
A2|casa|Hay que limpiar la habitación antes de salir.|Нужно убрать комнату, прежде чем выйти.
A2|casa|El garaje está debajo del dormitorio.|Гараж находится под спальней.
A2|comida|Añade un poco de sal y mezcla los ingredientes.|Добавь немного соли и смешай ингредиенты.
A2|comida|Para la ensalada necesitamos tomates y lechuga.|Для салата нам нужны помидоры и латук.
A2|compras|¿Tiene algo más barato?|У вас есть что-нибудь подешевле?
A2|compras|¿Puedo pagar con tarjeta?|Можно заплатить картой?
A2|compras|Quiero probarme esta chaqueta en una talla menor.|Я хочу примерить эту куртку размером меньше.
A2|compras|No tengo suficiente dinero.|У меня недостаточно денег.
A2|ciudad|Gira a la derecha y sigue todo recto.|Поверни направо и иди прямо.
A2|ciudad|La farmacia está enfrente del banco.|Аптека напротив банка.
A2|transporte|Toma la segunda salida de la rotonda.|Выезжай на втором съезде с кругового движения.
A2|transporte|Aparca delante del supermercado.|Припаркуйся перед супермаркетом.
A2|transporte|Hemos perdido el autobús.|Мы опоздали на автобус.
A2|escuela|¿Has hecho los deberes?|Ты сделал домашнее задание?
A2|escuela|¿Qué asignatura tienes hoy?|Какой предмет у тебя сегодня?
A2|escuela|Mi asignatura favorita es la historia.|Мой любимый предмет — история.
A2|tiempo|Ayer llovió toda la tarde.|Вчера весь день шёл дождь.
A2|tiempo|Coge el paraguas porque va a llover.|Возьми зонт, потому что будет дождь.
A2|ropa|Estos zapatos me quedan pequeños.|Эти туфли мне малы.
A2|hora|Mi cumpleaños es el dos de mayo.|Мой день рождения второго мая.
A2|hora|La película empieza a las nueve y media.|Фильм начинается в половине десятого.
A2|numeros|Has ganado cien euros.|Ты выиграл сто евро.
A2|animales|El conejo come zanahorias en el jardín.|Кролик ест морковь в саду.
A2|ocio|Me gusta jugar al ajedrez con mi hija.|Мне нравится играть в шахматы с дочерью.
A2|ocio|¿Quieres venir al cine conmigo?|Хочешь пойти со мной в кино?
A2|planes|Este fin de semana vamos de excursión.|В эти выходные мы едем на экскурсию.
A2|planes|He invitado a unos amigos a cenar.|Я пригласил друзей на ужин.
A2|rutina|Primero me ducho y después desayuno.|Сначала я принимаю душ, потом завтракаю.
A2|rutina|Los sábados no tengo que madrugar.|По субботам мне не нужно рано вставать.
A2|trabajo|El fontanero ha reparado el lavabo.|Сантехник починил раковину.
A2|trabajo|¿A qué te dedicas?|Кем ты работаешь?
A2|viajes|Hemos reservado una habitación doble.|Мы забронировали двухместный номер.
A2|viajes|¿A qué hora sale el vuelo a Madrid?|Во сколько вылетает рейс в Мадрид?
A2|herramientas|Necesito un martillo y unos clavos.|Мне нужен молоток и гвозди.
A2|bloques|Construye una casa cerca del río.|Построй дом возле реки.
A2|bloques|Encuentra el cofre escondido.|Найди спрятанный сундук.
A2|navidad|En Nochevieja comemos doce uvas.|В новогоднюю ночь мы едим двенадцать виноградин.
A2|casa|¿Cuánto cuesta esta casa?|Сколько стоит этот дом?
B1|familia|Cuando era pequeño, visitaba a mis abuelos cada verano.|Когда я был маленьким, я навещал бабушку с дедушкой каждое лето.
B1|familia|Me llevo muy bien con mi hermana mayor.|Я очень хорошо лажу со старшей сестрой.
B1|casa|Si tenemos dinero, compraremos muebles nuevos.|Если у нас будут деньги, мы купим новую мебель.
B1|casa|La casa que hemos alquilado tiene vistas al mar.|Дом, который мы сняли, с видом на море.
B1|comida|Mientras se fríen las patatas, bate los huevos.|Пока жарится картофель, взбей яйца.
B1|compras|Me gustaría devolver este jersey porque está roto.|Я хотел бы вернуть этот свитер, потому что он порван.
B1|compras|Si lo compras en las rebajas, ahorrarás mucho.|Если купишь на распродаже, сэкономишь много.
B1|ciudad|Antes había un mercado donde ahora está el banco.|Раньше там, где сейчас банк, был рынок.
B1|transporte|Llegamos tarde porque había un atasco enorme.|Мы опоздали, потому что была огромная пробка.
B1|transporte|No se puede aparcar aquí sin permiso.|Здесь нельзя парковаться без разрешения.
B1|escuela|Espero que apruebes el examen de mañana.|Надеюсь, ты сдашь завтрашний экзамен.
B1|escuela|El profesor nos explicó cómo resolver el problema.|Учитель объяснил нам, как решить задачу.
B1|tiempo|Mañana lloverá en el norte y hará sol en el sur.|Завтра на севере будет дождь, а на юге солнце.
B1|tiempo|Estaba paseando cuando empezó la tormenta.|Я гулял, когда началась гроза.
B1|ropa|Busco una camisa de algodón que no sea muy cara.|Я ищу хлопковую рубашку, которая была бы не очень дорогой.
B1|hora|Llevo tres años estudiando español.|Я учу испанский уже три года.
B1|animales|Los murciélagos salen de la cueva al anochecer.|Летучие мыши вылетают из пещеры с наступлением темноты.
B1|ocio|El equipo empató en el último minuto.|Команда сравняла счёт на последней минуте.
B1|ocio|Aunque perdimos, el partido fue muy entretenido.|Хотя мы проиграли, матч был очень увлекательным.
B1|planes|Hemos aplazado la excursión por el mal tiempo.|Мы отложили экскурсию из-за плохой погоды.
B1|planes|Si no llueve, iremos a la playa.|Если не будет дождя, мы поедем на пляж.
B1|rutina|Alejandro se encarga de planchar la ropa.|Александр занимается глажкой одежды.
B1|rutina|Ya me he acostumbrado a madrugar.|Я уже привык рано вставать.
B1|trabajo|La empresa me ofreció un contrato fijo.|Компания предложила мне постоянный контракт.
B1|trabajo|Antes trabajaba en una oficina, pero ahora trabajo en casa.|Раньше я работал в офисе, а теперь работаю дома.
B1|viajes|Nuestro vuelo se ha retrasado dos horas.|Наш рейс задержали на два часа.
B1|viajes|¿Podría recomendarme un alojamiento tranquilo?|Не могли бы вы посоветовать мне спокойное жильё?
B1|herramientas|Antes de cambiar el enchufe, corta la luz.|Прежде чем менять розетку, отключи электричество.
B1|bloques|Sigue las pistas hasta la salida del laberinto.|Следуй подсказкам до выхода из лабиринта.
B1|navidad|Brindamos por la salud de toda la familia.|Мы поднимаем тост за здоровье всей семьи.
B1|numeros|La mitad de los alumnos ha sacado buena nota.|Половина учеников получила хорошую оценку.`;
export const PHRASES: Phrase[] = R.split('\n').map(l => { const [level, theme, es, ru] = l.split('|'); return { level: level as Level, theme: theme as Theme, es, ru }; });
const Q = `A1|comida|¿Qué quieres beber?|Что хочешь пить?|Quiero agua, por favor.|Воды, пожалуйста.|Son las cinco.|Пять часов.|Me llamo Lev.|Меня зовут Лев.
A1|familia|¿Cómo te llamas?|Как тебя зовут?|Me llamo Mira.|Меня зовут Мира.|Tengo hambre.|Я голоден.|Está en la mesa.|Он на столе.
A1|hora|¿Qué hora es?|Который час?|Son las dos.|Два часа.|Es lunes.|Понедельник.|Es grande.|Он большой.
A1|compras|¿Cuánto cuesta el pan?|Сколько стоит хлеб?|Cuesta un euro.|Один евро.|Es blanco.|Он белый.|Está aquí.|Он здесь.
A1|ciudad|¿Dónde está el banco?|Где банк?|Está a la derecha.|Направо.|Está cansado.|Он устал.|A las nueve.|В девять.
A1|tiempo|¿Qué tiempo hace?|Какая погода?|Hace sol.|Солнечно.|Hace dos años.|Два года назад.|Son las seis.|Шесть часов.
A1|rutina|¿Puedes ayudarme?|Можешь мне помочь?|Sí, claro.|Да, конечно.|No, gracias, no fumo.|Нет, спасибо, не курю.|De nada.|Не за что.
A1|escuela|¿Qué necesitas para escribir?|Что тебе нужно, чтобы писать?|Un lápiz.|Карандаш.|Una cama.|Кровать.|Un zapato.|Туфля.
A2|compras|¿En qué puedo ayudarle?|Чем могу помочь?|Estoy buscando tomates.|Я ищу помидоры.|Tengo treinta años.|Мне тридцать лет.|Está lloviendo.|Идёт дождь.
A2|compras|¿Va a pagar en efectivo?|Будете платить наличными?|No, con tarjeta.|Нет, картой.|No, en autobús.|Нет, на автобусе.|Sí, con leche.|Да, с молоком.
A2|escuela|¿Has hecho los deberes?|Ты сделал уроки?|Sí, ya los he hecho.|Да, уже сделал.|Sí, los haré ayer.|(ошибка во времени)|No, no me gustan ayer.|(бессмысленно)
A2|viajes|¿Tiene una reserva?|У вас есть бронь?|Sí, a nombre de Elena.|Да, на имя Елены.|Sí, me gusta nadar.|Да, люблю плавать.|No, es muy alto.|Нет, он очень высокий.
A2|planes|¿Quedamos el sábado?|Встретимся в субботу?|Vale, ¿a qué hora?|Хорошо, во сколько?|Vale, ¿cuánto cuesta?|Хорошо, сколько стоит?|Es azul.|Он синий.
A2|comida|¿Qué van a tomar de segundo?|Что возьмёте на второе?|Para mí, pescado a la plancha.|Мне рыбу на гриле.|Para mí, la segunda calle.|Мне вторую улицу.|Son cuatro.|Нас четверо.
A2|transporte|¿Cómo vas al trabajo?|Как ты добираешься на работу?|Voy en autobús.|На автобусе.|Voy a las ocho de azul.|(бессмысленно)|Trabajo mucho.|Я много работаю.
B1|viajes|¿Qué habrías hecho en mi lugar?|Что бы ты сделал на моём месте?|Yo habría llamado al hotel.|Я бы позвонил в гостиницу.|Yo llamé al hotel mañana.|(ошибка во времени)|Yo llamo ayer.|(ошибка во времени)
B1|trabajo|¿Por qué quiere trabajar con nosotros?|Почему вы хотите у нас работать?|Porque me interesa su proyecto.|Потому что мне интересен ваш проект.|Porque ayer será lunes.|(бессмысленно)|Por la derecha.|Справа.
B1|compras|¿Cuál es el problema con el producto?|В чём проблема с товаром?|No funciona y quiero devolverlo.|Не работает, хочу вернуть.|Está enfrente del cine.|Он напротив кино.|Me quedo una semana.|Останусь на неделю.
B1|familia|¿Qué hacías cuando eras niño?|Что ты делал, когда был ребёнком?|Jugaba en la calle con mis primos.|Играл на улице с двоюродными братьями.|Jugaré en la calle.|Буду играть на улице.|Juego ayer con ellos.|(ошибка во времени)
B1|planes|¿Y si vamos a la montaña?|А если поехать в горы?|Buena idea, si no llueve.|Хорошая идея, если не будет дождя.|Sí, fuimos mañana.|(ошибка во времени)|No, es de algodón.|Нет, он хлопковый.`;
export interface Reply { level: Level; theme: Theme; q: P; a: P; bad: P[] }
export const REPLIES: Reply[] = Q.split('\n').map(l => { const x = l.split('|'); return { level: x[0] as Level, theme: x[1] as Theme, q: [x[2], x[3]], a: [x[4], x[5]], bad: [[x[6], x[7]], [x[8], x[9]]] }; });

import type { Line } from '../ui/kit';
import type { P, Level } from '../core/types';
const R = `#super A1 En la caja=На кассе
N>Buenos días. ¿En qué puedo ayudarle?=Добрый день. Чем могу помочь?
?Estoy buscando tomates.=Я ищу помидоры.+|Son las tres de la tarde.=Три часа дня.|Me llamo mañana.=(бессмысленная фраза)
!Вас спрашивают, чем помочь. Нужно сказать, что вы ищете: «Estoy buscando…».
N>Están al fondo, a la derecha.=Они в глубине зала, справа.
?¿Cuánto cuesta un kilo?=Сколько стоит килограмм?+|¿Cuántos años tienes?=Сколько тебе лет?
!О цене спрашивают «¿Cuánto cuesta…?».
N>Dos euros el kilo.=Два евро за килограмм.
?¿Tiene algo más barato?=У вас есть что-нибудь подешевле?+|¿Tiene algo más alto?=Есть что-нибудь повыше?
!«Дешевле» — más barato.
N>Sí, estos están de oferta. ¿Algo más?=Да, эти по акции. Что-нибудь ещё?
?No, gracias. ¿Puedo pagar con tarjeta?=Нет, спасибо. Можно оплатить картой?+|Sí, hace mucho calor.=Да, очень жарко.
!На кассе уместно спросить об оплате: «¿Puedo pagar con tarjeta?».
N>Claro que sí. ¡Que tenga un buen día!=Конечно. Хорошего дня!
#verduras A1 Las verduras=Овощи
N>¡Hola! Hoy las manzanas están muy buenas.=Привет! Сегодня яблоки очень хорошие.
?Póngame un kilo de manzanas, por favor.=Взвесьте килограмм яблок, пожалуйста.+|Yo soy una manzana.=Я яблоко.
!Просьба продавцу: «Póngame … , por favor».
N>Aquí tiene. ¿Quiere también naranjas?=Вот, пожалуйста. Апельсины тоже хотите?
?Sí, medio kilo.=Да, полкило.+|Sí, a las ocho.=Да, в восемь.
!Вопрос о товаре, значит нужно количество: medio kilo — полкило.
N>Perfecto. Son tres euros.=Отлично. С вас три евро.
#vecina A1 La vecina=Соседка
N>¡Hola! ¿Qué tal la familia?=Привет! Как семья?
?Muy bien, gracias. ¿Y la tuya?=Очень хорошо, спасибо. А твоя?+|La familia es roja.=Семья красная.
!На «¿Qué tal?» отвечают «Muy bien, gracias».
N>Bien también. Mis hijos tienen vacaciones.=Тоже хорошо. У моих детей каникулы.
?¿Queréis venir a casa el domingo?=Хотите прийти к нам в воскресенье?+|¿Cuánto cuestan tus hijos?=Сколько стоят твои дети?
!Здесь уместно приглашение: «¿Queréis venir…?».
N>¡Qué buena idea! Llevo una tarta.=Отличная идея! Я принесу торт.
#profesora A1 La profesora=Учительница
N>¡Buenos días! ¿Cómo estás?=Доброе утро! Как дела?
?Estoy bien, gracias.=Хорошо, спасибо.+|Estoy en martes.=Я во вторнике.
!«¿Cómo estás?» — «Estoy bien».
N>Hoy vamos a leer un texto. ¿Entiendes este ejercicio?=Сегодня будем читать текст. Понимаешь это упражнение?
?No entiendo este ejercicio. ¿Puedes repetir, por favor?=Я не понимаю это упражнение. Можешь повторить?+|¿Puedo comer el ejercicio?=Можно съесть упражнение?
!Если непонятно: «No entiendo… ¿Puedes repetir, por favor?».
N>Claro. Lee y responde a las preguntas.=Конечно. Читай и отвечай на вопросы.
?¿Puedo ir al baño?=Можно выйти в туалет?+|¿Puedo ir a la luna?=Можно на Луну?
!В школе спрашивают «¿Puedo ir al baño?».
N>Sí, pero vuelve pronto.=Да, но возвращайся быстро.
#deberes A2 Los deberes=Домашнее задание
N>¿Has hecho los deberes?=Ты сделал уроки?
?Sí, los he hecho esta mañana.=Да, сделал сегодня утром.+|Sí, los haré ayer.=(ошибка: будущее + вчера)
!Вопрос в Pretérito Perfecto (has hecho) — отвечаем тоже: los he hecho.
N>¿Qué asignatura te gusta más?=Какой предмет тебе больше нравится?
?Me gustan las matemáticas.=Мне нравится математика.+|Me gusta las matemáticas.=(ошибка согласования)
!Las matemáticas — множественное число, поэтому gustan.
N>¡Muy bien! Mañana tenemos un examen.=Отлично! Завтра у нас контрольная.
#reunion A2 La reunión de padres=Родительское собрание
N>Gracias por venir a la reunión. Su hijo trabaja muy bien.=Спасибо, что пришли на собрание. Ваш ребёнок хорошо занимается.
?Me alegro. ¿Qué tiene que mejorar?=Я рад(а). Что нужно улучшить?+|Me alegro. ¿Qué tiempo hace?=Я рад(а). Какая погода?
!На собрании уместно спросить, что улучшить: «¿Qué tiene que mejorar?».
N>Tiene que leer más en casa.=Ему нужно больше читать дома.
?De acuerdo. Leeremos juntos todos los días.=Хорошо. Будем читать вместе каждый день.+|De acuerdo. Leímos juntos mañana.=(ошибка: прошедшее + завтра)
!Обещание — Futuro Simple: leeremos.
N>¡Estupendo! La excursión es el viernes.=Прекрасно! Экскурсия в пятницу.
?¿A qué hora salen?=Во сколько выезжают?+|¿De qué color salen?=Какого цвета выезжают?
!О времени: «¿A qué hora…?».
N>A las nueve de la mañana.=В девять утра.
#notas B1 Las notas=Оценки
N>Este trimestre ha habido un cambio en las notas.=В этой четверти оценки изменились.
?¿Ha sacado peores notas que antes?=Он получил оценки хуже, чем раньше?+|¿Ha sacado peores notas como antes?=(ошибка: сравнение с que)
!Сравнение: peores … que.
N>No, al contrario, ha mejorado mucho.=Нет, наоборот, очень вырос.
?Antes le costaba concentrarse.=Раньше ему было трудно сосредоточиться.+|Antes le costará concentrarse.=(ошибка: antes + будущее)
!Antes + описание прошлого → Imperfecto: costaba.
N>Exacto. Espero que siga así.=Точно. Надеюсь, так и продолжит.
#companero A1 Un compañero=Одноклассник
N>¡Hola! ¿Cómo se llama tu profesor?=Привет! Как зовут твоего учителя?
?Se llama Martín.=Его зовут Мартин.+|Me llamo silla.=Меня зовут стул.
!«Его зовут» — se llama.
N>¿Qué asignatura tienes hoy?=Какой предмет у тебя сегодня?
?Tengo historia y matemáticas.=История и математика.+|Tengo hambre de azul.=(бессмысленно)
!Нужно назвать предметы.
N>¡Yo también! ¿Jugamos en el recreo?=Я тоже! Поиграем на перемене?
?¡Sí, vamos a jugar al fútbol!=Да, сыграем в футбол!+|No, soy un balón.=Нет, я мяч.
!Согласие: «¡Sí, vamos a…!».
N>¡Genial! Nos vemos en el patio.=Здорово! Увидимся во дворе.
#companera A1 Una compañera=Одноклассница
N>¿Tienes un lápiz?=У тебя есть карандаш?
?Sí, toma.=Да, держи.+|Sí, soy alto.=Да, я высокий.
!Передавая предмет, говорят «Toma».
N>¡Gracias! ¿Cuántos años tienes?=Спасибо! Сколько тебе лет?
?Tengo diez años.=Мне десять лет.+|Soy diez años.=(ошибка: возраст с tener)
!Возраст по-испански — с глаголом tener: tengo diez años.
N>Yo también tengo diez.=Мне тоже десять.
#biblioteca A2 En la biblioteca=В библиотеке
N>Buenas tardes. ¿Buscas algún libro?=Добрый день. Ищешь какую-то книгу?
?Sí, quiero un libro de aventuras.=Да, хочу книгу о приключениях.+|Sí, quiero un kilo de libros.=Да, хочу кило книг.
!Назовите жанр: un libro de aventuras.
N>Tenemos muchos. ¿Tienes el carné?=У нас их много. Есть читательский билет?
?No, ¿puedo hacerlo ahora?=Нет, можно оформить сейчас?+|No, lo hice mañana.=(ошибка времени)
!Вежливая просьба: «¿Puedo hacerlo ahora?».
N>Claro. Puedes llevarte el libro dos semanas.=Конечно. Книгу можно взять на две недели.
?¿Cuándo tengo que devolverlo?=Когда нужно вернуть?+|¿Cuándo tengo que comerlo?=Когда надо её съесть?
!Devolver — возвращать.
N>Antes del día quince.=До пятнадцатого числа.
#cafe A1 En el café=В кафе
N>¡Hola! ¿Qué quieres tomar?=Привет! Что будешь?
?Un café con leche, por favor.=Кофе с молоком, пожалуйста.+|Un coche con leche.=Машину с молоком.
!Café — кофе, coche — машина.
N>¿Y para comer?=А поесть?
?Un trozo de tarta.=Кусок торта.+|Una silla.=Стул.
!Нужно назвать еду.
N>Muy bien. ¿Algo más?=Хорошо. Что-то ещё?
?No, gracias. La cuenta, por favor.=Нет, спасибо. Счёт, пожалуйста.+|Sí, el martes.=Да, вторник.
!Счёт — la cuenta.
N>Son cuatro euros con cincuenta.=Четыре евро пятьдесят.
#restaurante A2 En el restaurante=В ресторане
N>Buenas noches. ¿Tienen reserva?=Добрый вечер. У вас есть бронь?
?Sí, una mesa para cuatro a nombre de Alejandro.=Да, столик на четверых на имя Александра.+|Sí, cuatro mesas para un nombre.=(бессмысленно)
!Бронь: una mesa para … a nombre de ….
N>Por aquí. ¿Qué van a tomar de primero?=Сюда. Что возьмёте на первое?
?Para mí, gazpacho.=Мне гаспачо.+|Para mí, primero de mayo.=Мне первое мая.
!De primero — первое блюдо.
N>¿Y de segundo?=А на второе?
?¿Qué nos recomienda?=Что вы нам посоветуете?+|¿Qué nos llueve?=(бессмысленно)
!Recomendar — советовать.
N>La paella es la especialidad de la casa.=Паэлья — фирменное блюдо.
?Perfecto, una paella para todos.=Отлично, паэлью на всех.+|No, no tengo hermanos.=Нет, у меня нет братьев.
!Подтвердите заказ.
N>Enseguida. ¡Buen provecho!=Сейчас. Приятного аппетита!
?¿Nos trae la cuenta, por favor?=Принесите нам счёт, пожалуйста.+|¿Nos trae el cuento?=Принесите нам сказку.
!La cuenta — счёт, el cuento — сказка.
#chef A2 La chef=Шеф-повар
N>¿Sabes cocinar una tortilla?=Умеешь готовить тортилью?
?Sí, corto las patatas y bato los huevos.=Да, режу картофель и взбиваю яйца.+|Sí, corto los huevos y bato las sillas.=(бессмысленно)
!Картофель режут (cortar), яйца взбивают (batir).
N>¿Y después?=А потом?
?Frío las patatas con aceite.=Жарю картофель на масле.+|Lavo las patatas con café.=Мою картофель кофе.
!Freír — жарить: yo frío.
N>¡Ven a mi cocina cuando quieras!=Приходи на мою кухню когда угодно!
#electro A2 Electrodomésticos=Бытовая техника
N>Buenos días, ¿busca algo en concreto?=Добрый день, ищете что-то конкретное?
?Necesito un frigorífico que gaste poco.=Мне нужен холодильник с малым расходом.+|Necesito un frigorífico que cante.=Мне нужен холодильник, который поёт.
!Gastar poco — мало потреблять.
N>Este es de clase A y tiene tres años de garantía.=Этот класса А, гарантия три года.
?¿Está rebajado?=Он со скидкой?+|¿Está casado?=Он женат?
!Rebajado — со скидкой.
N>Sí, cuesta cien euros menos.=Да, на сто евро дешевле.
?¿Lo llevan a casa?=Доставляете домой?+|¿Lo llevan puesto?=Его надевают?
!Доставка: «¿Lo llevan a casa?».
N>Sí, el transporte es gratis.=Да, доставка бесплатная.
#ropa A2 En la tienda de ropa=В магазине одежды
N>Hola, ¿te ayudo?=Здравствуйте, помочь?
?Sí, busco una chaqueta azul.=Да, ищу синюю куртку.+|Sí, busco una ensalada azul.=Да, ищу синий салат.
!Нужно назвать одежду.
N>¿Qué talla usas?=Какой размер?
?La talla mediana.=Средний.+|La talla de la mesa.=(бессмысленно)
!Talla — размер одежды.
N>Aquí tienes. El probador está al fondo.=Вот. Примерочная в конце зала.
?Me queda un poco grande.=Мне великовата.+|Me queda dos horas grande.=(бессмысленно)
!«Мне велика» — me queda grande.
N>Te traigo una más pequeña.=Принесу поменьше.
#farmacia A2 En la farmacia=В аптеке
N>Buenos días, ¿qué le pasa?=Добрый день, что случилось?
?Me duele la cabeza.=У меня болит голова.+|Me duele la ventana.=У меня болит окно.
!Doler: me duele + часть тела.
N>¿Tiene fiebre?=Температура есть?
?No, pero tengo tos.=Нет, но у меня кашель.+|No, pero tengo coche.=Нет, но у меня машина.
!Tos — кашель.
N>Tome esta medicina dos veces al día.=Принимайте это лекарство два раза в день.
?¿Antes o después de comer?=До или после еды?+|¿Antes o después de Cristo?=До или после нашей эры?
!Уточните приём лекарства.
N>Después de comer. ¡Que se mejore!=После еды. Выздоравливайте!
#banco A2 En el banco=В банке
N>Buenos días, ¿qué desea?=Добрый день, что желаете?
?Quiero abrir una cuenta.=Хочу открыть счёт.+|Quiero abrir una ventana al cuento.=(бессмысленно)
!Открыть счёт — abrir una cuenta.
N>¿Tiene su pasaporte?=Паспорт с собой?
?Sí, aquí está.=Да, вот он.+|Sí, aquí estoy.=Да, я здесь.
!Про предмет: aquí está.
N>¿Cuánto dinero va a ingresar?=Сколько внесёте?
?Doscientos euros.=Двести евро.+|Dos días de euros.=(бессмысленно)
!Нужна сумма.
N>Firme aquí, por favor.=Подпишите здесь, пожалуйста.
#cine A1 En la taquilla=В кассе кинотеатра
N>Hola, ¿qué película queréis ver?=Привет, какой фильм хотите посмотреть?
?La película de aventuras.=Приключенческий.+|La película de agua fría.=(бессмысленно)
!Назовите жанр.
N>¿Cuántas entradas?=Сколько билетов?
?Cuatro entradas, por favor.=Четыре билета, пожалуйста.+|Cuatro salidas, por favor.=Четыре выхода.
!Входной билет — entrada.
N>Empieza a las seis. Sala dos.=Начало в шесть. Зал два.
?¿Tenéis palomitas?=У вас есть попкорн?+|¿Tenéis sueño?=Вы хотите спать?
!Palomitas — попкорн.
N>Sí, ahí a la derecha. ¡Que disfrutéis!=Да, вон там справа. Приятного просмотра!
#juguetes A1 Los juguetes=Игрушки
N>¡Bienvenidos! ¿Para quién es el regalo?=Добро пожаловать! Для кого подарок?
?Es para mi hermana.=Для моей сестры.+|Es para las cinco.=Это для пяти часов.
!Para + человек.
N>¿Qué le gusta?=Что она любит?
?Le gustan los juegos de mesa.=Ей нравятся настольные игры.+|Le gusta los juegos.=(ошибка согласования)
!Los juegos — мн. число → le gustan.
N>Entonces este ajedrez es perfecto.=Тогда эти шахматы идеальны.
#bricolaje A1 El bricolaje=Инструменты
N>Hola, ¿qué necesita?=Здравствуйте, что нужно?
?Necesito un martillo y unos clavos.=Мне нужен молоток и гвозди.+|Necesito un martillo y unas uvas.=Мне нужен молоток и виноград.
!Молотком забивают гвозди — clavos.
N>¿Va a hacer una mesa?=Будете делать стол?
?Sí, también necesito madera.=Да, ещё нужна древесина.+|Sí, también necesito sopa.=Да, ещё нужен суп.
!Стол делают из дерева — madera.
N>La madera está en el pasillo tres.=Древесина в третьем ряду.
#club A1 El club de juegos=Игровой клуб
N>¡Bienvenida al club! ¿A qué quieres jugar?=Добро пожаловать в клуб! Во что хочешь сыграть?
?Quiero jugar al ajedrez.=Хочу сыграть в шахматы.+|Quiero jugar a la cama.=(бессмысленно)
!Jugar a + игра: al ajedrez.
N>¿Conoces las piezas?=Знаешь фигуры?
?Sí: el rey, la reina y el caballo.=Да: король, ферзь и конь.+|Sí: el pan, la leche y el queso.=Да: хлеб, молоко и сыр.
!Нужно назвать фигуры.
N>¡Perfecto! Elige una mesa.=Отлично! Выбирай стол.
#club2 A2 Un jugador=Игрок
N>¿Jugamos una partida?=Сыграем партию?
?Vale, ¿quién empieza?=Ладно, кто начинает?+|Vale, ¿quién llueve?=(бессмысленно)
!Кто начинает — ¿quién empieza?
N>Las blancas. ¡Es tu turno!=Белые. Твой ход!
?¡Jaque mate!=Шах и мат!+|¡Jaque té!=(бессмысленно)
!Мат — mate.
N>¡Vaya! Has ganado otra vez.=Ого! Ты снова выиграл.
#estacion A2 En la estación=На вокзале
N>Buenos días, ¿adónde va?=Добрый день, куда едете?
?Quiero un billete a Sevilla.=Мне билет до Севильи.+|Quiero una entrada a Sevilla de cine.=(бессмысленно)
!Билет на транспорт — billete.
N>¿Solo ida o ida y vuelta?=Только туда или туда и обратно?
?Ida y vuelta.=Туда и обратно.+|Ida y ventana.=(бессмысленно)
!Туда и обратно — ida y vuelta.
N>Sale a las diez, andén cuatro.=Отправление в десять, платформа четыре.
?¿Cuánto dura el viaje?=Сколько длится поездка?+|¿Cuánto pesa el viaje?=Сколько весит поездка?
!Длиться — durar.
N>Dos horas y media.=Два с половиной часа.
#viajero B1 Un viajero=Пассажир
N>Perdone, ¿sabe si el tren ha llegado ya?=Простите, не знаете, поезд уже пришёл?
?Todavía no, llegará dentro de diez minutos.=Ещё нет, придёт через десять минут.+|Todavía sí, llegó mañana.=(ошибка времени)
!Будущее: llegará dentro de….
N>Menos mal. Cuando era joven, los trenes siempre llegaban tarde.=Слава богу. Когда я был молод, поезда всегда опаздывали.
?Ahora han mejorado mucho.=Теперь стало намного лучше.+|Ahora mejoraban mañana.=(ошибка времени)
!Ahora + результат → Perfecto: han mejorado.
N>Tiene razón. ¡Buen viaje!=Вы правы. Счастливого пути!
#aeropuerto A2 Facturación=Регистрация
N>Buenos días. El pasaporte y el billete, por favor.=Добрый день. Паспорт и билет, пожалуйста.
?Aquí tiene.=Вот, пожалуйста.+|Aquí llueve.=Здесь идёт дождь.
!Передавая: «Aquí tiene».
N>¿Cuántas maletas va a facturar?=Сколько чемоданов сдаёте?
?Dos maletas y una mochila de mano.=Два чемодана и рюкзак в ручную кладь.+|Dos pasillos.=Два прохода.
!Maleta — чемодан.
N>¿Ventanilla o pasillo?=У окна или у прохода?
?Ventanilla, por favor.=У окна, пожалуйста.+|Cocina, por favor.=Кухню, пожалуйста.
!Выберите место: ventanilla или pasillo.
N>Puerta doce, embarque a las diez y cuarto.=Выход двенадцать, посадка в десять пятнадцать.
#control B1 Control de seguridad=Контроль безопасности
N>Ponga sus cosas en la bandeja, por favor.=Положите вещи в лоток, пожалуйста.
?¿Tengo que quitarme el cinturón?=Нужно снять ремень?+|¿Tengo que comerme el cinturón?=Нужно съесть ремень?
!Снять — quitarse.
N>Sí, y saque el ordenador de la mochila.=Да, и достаньте ноутбук из рюкзака.
?De acuerdo. ¿Puedo llevar esta botella?=Хорошо. Можно пронести эту бутылку?+|De acuerdo. ¿Puedo volar sin avión?=Можно лететь без самолёта?
!Llevar — нести с собой.
N>No, los líquidos no están permitidos.=Нет, жидкости не разрешены.
#hotel A2 En el hotel=В гостинице
Recepcionista>Bienvenidos. ¿Tienen una reserva?=Добро пожаловать. Есть бронь?
?Sí, una habitación para cuatro personas.=Да, номер на четверых.+|Sí, cuatro personas para una puerta.=(бессмысленно)
!Номер — habitación.
Recepcionista>¿Para cuántas noches?=На сколько ночей?
?Tres noches.=Три ночи.+|Tres llaves.=Три ключа.
!Вопрос о ночах.
Recepcionista>Aquí tienen la llave. Habitación doscientos cinco.=Вот ключ. Номер двести пять.
?¿A qué hora es el desayuno?=Во сколько завтрак?+|¿A qué hora es la pared?=Во сколько стена?
!Desayuno — завтрак.
Recepcionista>De siete a diez. ¡Feliz estancia!=С семи до десяти. Приятного пребывания!
#desayuno A1 El desayuno en familia=Семейный завтрак
Elena>¿Qué queréis desayunar?=Что вы хотите на завтрак?
Lev>Quiero huevos y pan.=Я хочу яйца и хлеб.
Mira>Yo prefiero un yogur.=Я предпочитаю йогурт.
Alejandro>Voy a preparar el café.=Я приготовлю кофе.
Elena>¿Y tú? ¿Qué quieres?=А ты что хочешь?
?Yo quiero pan con tomate.=Я хочу хлеб с помидором.+|Yo quiero una lámpara.=Я хочу лампу.
!Нужно назвать еду.
Alejandro>¿Dónde está la leche?=Где молоко?
?Está en el frigorífico.=В холодильнике.+|Está en el armario de la ropa.=В платяном шкафу.
!Молоко хранится в холодильнике — el frigorífico.
Mira>¿Puedes pasarme el azúcar?=Передашь мне сахар?
?Claro, aquí tienes.=Конечно, держи.+|No, es lunes.=Нет, понедельник.
!Передавая: «Aquí tienes».
Lev>¡Qué rico! Gracias, familia.=Как вкусно! Спасибо, семья.
#manana A1 Por la mañana=Утром
Elena>¡Buenos días! Son las siete. ¡Hay que levantarse!=Доброе утро! Семь часов. Пора вставать!
?Ya me levanto.=Уже встаю.+|Ya me llamo.=Уже меня зовут.
!Вставать — levantarse: me levanto.
Elena>Hoy hace frío. ¿Qué te pones?=Сегодня холодно. Что наденешь?
?Me pongo un jersey y un abrigo.=Надену свитер и пальто.+|Me pongo un bañador.=Надену купальник.
!В холод — jersey y abrigo.
Elena>¿Te has lavado los dientes?=Зубы почистил?
?Sí, ya me he lavado los dientes.=Да, уже почистил.+|Sí, ya me he lavado el autobús.=Да, уже помыл автобус.
!Los dientes — зубы.
Elena>¡Perfecto! El desayuno está en la mesa.=Отлично! Завтрак на столе.
#telefono A2 Por teléfono=По телефону
Centro médico>Centro médico, buenos días. ¿Dígame?=Медцентр, добрый день. Слушаю.
?Buenos días, quería pedir una cita.=Добрый день, я хотел бы записаться.+|Buenos días, quería pedir una paella.=Хотел бы заказать паэлью.
!Записаться на приём — pedir una cita.
Centro médico>¿Para qué día?=На какой день?
?Para el jueves por la tarde.=На четверг после обеда.+|Para el color verde.=На зелёный цвет.
!Нужен день.
Centro médico>Tenemos hueco a las cinco y media.=Есть место в полшестого.
?Muy bien, ¿puede repetir la hora?=Хорошо, повторите время, пожалуйста.+|Muy bien, ¿puede repetir el médico?=(бессмысленно)
!Переспросить время: repetir la hora.
Centro médico>A las cinco y media. ¿Su número de teléfono?=В полшестого. Ваш номер телефона?
?Es el seis, cero, cero, uno, dos, tres.=Шесть, ноль, ноль, один, два, три.+|Es azul y grande.=Он синий и большой.
!Продиктуйте цифры.
Centro médico>Perfecto. Hasta el jueves.=Отлично. До четверга.
#invitados A2 Invitar a los amigos=Пригласить друзей
Amiga>¿Diga? ¡Hola! ¿Qué tal?=Алло? Привет! Как дела?
?¡Hola! ¿Queréis cenar en casa el sábado?=Привет! Хотите поужинать у нас в субботу?+|¡Hola! ¿Queréis cenar ayer?=(ошибка времени)
!Приглашение на будущий день: el sábado.
Amiga>¡Con mucho gusto! ¿Llevamos algo?=С удовольствием! Что-нибудь принести?
?Podéis traer el postre.=Можете принести десерт.+|Podéis traer el sofá.=Можете принести диван.
!Гости обычно приносят десерт — el postre.
Amiga>Vale. ¿A qué hora?=Хорошо. Во сколько?
?A las nueve.=В девять.+|A la derecha.=Направо.
!Нужно время.
Amiga>¡Nos vemos el sábado!=Увидимся в субботу!
#findesemana A1 El fin de semana=Выходные
Alejandro>¿Qué vamos a hacer el sábado?=Что будем делать в субботу?
?Podemos ir a la playa.=Можем поехать на пляж.+|Podemos ir a la sal.=Можем пойти в соль.
!La playa — пляж.
Mira>¿Y si llueve?=А если будет дождь?
?Si llueve, vamos al cine.=Если дождь, идём в кино.+|Si llueve, vamos a tomar el sol.=Если дождь, идём загорать.
!В дождь логично пойти в кино.
Lev>¡Yo quiero jugar en el parque!=Я хочу играть в парке!
?El domingo vamos al parque.=В воскресенье идём в парк.+|El domingo somos un parque.=В воскресенье мы парк.
!Идём — vamos.
Elena>¡Qué buen plan!=Какой хороший план!
#navidad A2 Nochevieja=Новогодняя ночь
Elena>En España comemos doce uvas a medianoche.=В Испании в полночь едят двенадцать виноградин.
?¿Por qué doce?=Почему двенадцать?+|¿Por qué azul?=Почему синий?
!Уместно спросить про число.
Elena>Una por cada campanada, para tener suerte.=Одну на каждый удар часов, на удачу.
Alejandro>¿Y quién trae los regalos?=А кто приносит подарки?
?Los Reyes Magos, el seis de enero.=Волхвы, шестого января.+|Los bomberos, en agosto.=Пожарные, в августе.
!В Испании подарки приносят los Reyes Magos.
Mira>¿Qué propósitos tenéis?=Какие у вас обещания на год?
?Este año hablaré mejor español.=В этом году я буду лучше говорить по-испански.+|Este año hablé mejor mañana.=(ошибка времени)
!Обещания — Futuro: hablaré.
Todos>¡Feliz Año Nuevo!=С Новым годом!
#parque A1 En el parque=В парке
N>¡Qué día tan bonito! ¿Vienes mucho al parque?=Какой красивый день! Часто бываешь в парке?
?Sí, vengo todos los domingos.=Да, каждое воскресенье.+|Sí, soy un domingo.=Да, я воскресенье.
!Прихожу — vengo.
N>Mi perro se llama Tango. ¿Tienes animales?=Мою собаку зовут Танго. У тебя есть животные?
?Tengo un gato y dos peces.=У меня кошка и две рыбки.+|Tengo un jueves.=У меня четверг.
!Назовите животных.
N>¡Qué bien! Hasta otro día.=Здорово! До встречи.
#playa A1 En la playa=На пляже
N>¡Hola! El agua está muy buena hoy.=Привет! Вода сегодня отличная.
?¡Genial! Voy a nadar.=Здорово! Пойду плавать.+|¡Genial! Voy a nevar.=Здорово! Пойду снежить.
!Nadar — плавать, nevar — идёт снег.
N>Ponte crema, hace mucho sol.=Намажься кремом, очень солнечно.
?Gracias, aquí tengo la crema solar.=Спасибо, вот мой крем.+|Gracias, aquí tengo la sopa.=Спасибо, вот мой суп.
!La crema solar — солнцезащитный крем.
N>¿Sabes? Dicen que hay un tesoro en la arena.=Знаешь? Говорят, в песке есть сокровище.
#restaurantetel B1 Una reclamación=Жалоба
Encargada>Buenas noches, ¿hay algún problema?=Добрый вечер, какие-то проблемы?
?Sí, pedimos pescado y nos han traído carne.=Да, мы заказали рыбу, а нам принесли мясо.+|Sí, pediremos pescado ayer.=(ошибка времени)
!Завершённое действие: pedimos; результат сейчас: han traído.
Encargada>Lo siento mucho. ¿Quieren que lo cambiemos?=Очень сожалею. Хотите, заменим?
?Sí, si no tarda demasiado.=Да, если не слишком долго.+|Sí, si no tardó mañana.=(ошибка времени)
!Реальное условие: si + presente.
Encargada>Les invitamos al postre.=Десерт за наш счёт.`;
export interface Dlg { id: string; level: Level; p: P; lines: Line[] }
export const DIALOGUES: Dlg[] = R.split('\n#').map(b => { const l = b.replace(/^#/, '').split('\n'), m = l[0].match(/^(\S+) (A1|A2|B1) (.+)=(.+)$/)!; const lines: Line[] = []; l.slice(1).forEach(x => {
  if (x[0] === '?') lines.push({ ask: x.slice(1).split('|').map(o => { const i = o.indexOf('='); const ok = o.endsWith('+'); return [o.slice(0, i), ok ? o.slice(i + 1, -1) : o.slice(i + 1), ok] as const; }), why: '' });
  else if (x[0] === '!') (lines[lines.length - 1] as { why: string }).why = x.slice(1);
  else { const i = x.indexOf('>'), j = x.lastIndexOf('='); lines.push([x.slice(0, i), x.slice(i + 1, j), x.slice(j + 1)] as const); } });
  return { id: m[1], level: m[2] as Level, p: [m[3], m[4]], lines }; });
export const dlg = (id: string, npc?: string): Dlg => { const d = DIALOGUES.find(x => x.id === id) ?? DIALOGUES[0]; return { ...d, lines: d.lines.map(l => Array.isArray(l) && l[0] === 'N' ? [npc ?? 'Vendedor', l[1], l[2]] as const : l) }; };

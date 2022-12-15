-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Дек 15 2022 г., 12:01
-- Версия сервера: 10.4.17-MariaDB
-- Версия PHP: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `company_app_db`
--

-- --------------------------------------------------------

--
-- Структура таблицы `case_`
--

CREATE TABLE `case_` (
  `id` int(10) NOT NULL,
  `description` varchar(150) NOT NULL,
  `income` double NOT NULL,
  `begin_date` date NOT NULL,
  `end_date` date NOT NULL,
  `real_end_date` date DEFAULT NULL,
  `employee_id` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `case_`
--

INSERT INTO `case_` (`id`, `description`, `income`, `begin_date`, `end_date`, `real_end_date`, `employee_id`) VALUES
(1, 'Продажа мороженого', 999, '2022-12-01', '2022-12-12', NULL, 1),
(2, 'Нарашивание льда', 578, '2022-12-01', '2022-12-14', NULL, 2),
(3, 'Продажа шариков', 987, '2022-12-01', '2022-12-09', '2022-12-09', 3),
(4, 'Покупка картин', 36878, '2022-12-01', '2022-12-09', '2022-12-10', 4),
(5, 'Машинки', 12345678, '2022-12-22', '2022-12-24', NULL, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `company`
--

CREATE TABLE `company` (
  `id` int(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `employees_quant` int(10) NOT NULL,
  `user_id` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `company`
--

INSERT INTO `company` (`id`, `name`, `employees_quant`, `user_id`) VALUES
(1, 'Завод Льда', 3, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `employee`
--

CREATE TABLE `employee` (
  `id` int(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `position` varchar(50) NOT NULL,
  `rating` double NOT NULL,
  `company_id` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `employee`
--

INSERT INTO `employee` (`id`, `name`, `position`, `rating`, `company_id`) VALUES
(1, 'Павел Пух', 'Статист', 0, 1),
(2, 'Кирилл НаконецРаботает', 'Работяга', 3, 1),
(3, 'Серёга Пулемет', 'Менеджер', 4, 1),
(4, 'Роман Ренегат', 'Дежурный', 1, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `state`
--

CREATE TABLE `state` (
  `id` int(10) NOT NULL,
  `status` varchar(50) NOT NULL,
  `case__id` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `state`
--

INSERT INTO `state` (`id`, `status`, `case__id`) VALUES
(1, 'Не начато', 1),
(2, 'В работе', 2),
(3, 'Завершено', 3),
(4, 'Завершено', 4);

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE `user` (
  `id` int(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`id`, `name`, `username`, `password`) VALUES
(1, 'Алексей Фростморн', '111', '$2a$10$fJaBONcYz8TIJ1DyBvm./.mPfedwi4D1l2i4w089Mco2c8vMQMdru');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `case_`
--
ALTER TABLE `case_`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Индексы таблицы `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`),
  ADD KEY `company_id` (`company_id`);

--
-- Индексы таблицы `state`
--
ALTER TABLE `state`
  ADD PRIMARY KEY (`id`),
  ADD KEY `case__id` (`case__id`);

--
-- Индексы таблицы `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `case_`
--
ALTER TABLE `case_`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `company`
--
ALTER TABLE `company`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `state`
--
ALTER TABLE `state`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `case_`
--
ALTER TABLE `case_`
  ADD CONSTRAINT `case__ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `company`
--
ALTER TABLE `company`
  ADD CONSTRAINT `company_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `state`
--
ALTER TABLE `state`
  ADD CONSTRAINT `state_ibfk_1` FOREIGN KEY (`case__id`) REFERENCES `case_` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

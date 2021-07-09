<?php

namespace App\Http\Controllers;

use App\Models\ShortLinks;
use App\Models\Statistic;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;


class ShortLinkController extends Controller
{
    const DAY = 24;
    const MINUTE = 60;
    const SECOND = 60;


    //Функция для перевода дней в timestamp
    private function convertLifetime($lifetime)
    {
        if (!is_null($lifetime)) {
            $lifetime = time() + ($lifetime * self::DAY * self::MINUTE * self::SECOND);
            return date('Y-m-d H:i:s', $lifetime);
        } else {
            return null;
        }

    }


    //Функция для создания короткой ссылки
    public function createLink(Request $request)
    {

        //Генерация случайной строки от 6 до 12 символов
        $rand_code = str_random(rand(6, 12));

        $lifetime = $this->convertLifetime($request->get('lifetime'));

        //Валидация данных
        try {
            Validator::make($request->all(), [
                'link' => 'required|url',
                'commercial' => 'required|boolean'
            ])->validate();
        } catch (ValidationException $e) {

            return response(["result" => "Проверьте правильность ввода URL."], $e->status);
        }
        //Если такой пользовательсое сокращение уже есть в таблице, то возвращаем ошибку
        $code = ShortLinks::where('code', $request->get('code'))->first();
        if (!is_null($code)) {
            return response(["result" => "Ссылка с данным названием уже существует"],
                Response::HTTP_BAD_REQUEST);
        }

        //Создаем новую ссылку, если пользовательское сокращение отсутствует
        if (is_null($request->get("code"))) {
            ShortLinks::create([
                'link' => $request->get("link"),
                'code' => $rand_code,
                'commercial' => $request->get("commercial"),
                'lifetime' => $lifetime
            ]);
            $resultLink = ShortLinks::where('code', $rand_code)->first();
        }

        //Иначе записываем пользовательский код
        else {
                ShortLinks::create([
                    'link' => $request->get("link"),
                    'code' => $request->get("code"),
                    'commercial' => $request->get("commercial"),
                    'lifetime' => $lifetime
                ]);
                $resultLink = ShortLinks::where('code', $request->get("code"))->first();

        }
        return response(['code' => $resultLink->toArray()['code']], Response::HTTP_CREATED);

    }

    //Функция для получения короткой ссылки, и запись статистики
    public function getLink(Request $request, $code)
    {
        $result = ShortLinks::where('code', $code)->first();
        if ($result != null) {
            $result->count++;
            $result->save();
            Statistic::create([
                'code' => $code,
                'key' => $request->header('user_id'),
                'agent' => $request->userAgent()
            ]);
            return response(['link' => $result->toArray()['link'],
                'commercial' => $result->toArray()['commercial']], Response::HTTP_OK);
        }
        else {
            return response(["result" => "Данная ссылка недоступна."], Response::HTTP_BAD_REQUEST);
        }
    }
}

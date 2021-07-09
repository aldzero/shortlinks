<?php

namespace App\Http\Controllers;


use App\Models\ShortLinks;
use App\Models\Statistic;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class StatisticController extends Controller
{

    const DAY = 24;
    const MINUTE = 60;
    const SECOND = 60;
    const TWO_WEEK = 14;

    //Перевод двух недель в timestamp
    private function getTime() {

            $time = time() - (self::TWO_WEEK * self::DAY * self::MINUTE * self::SECOND);
            return date('Y-m-d H:i:s', $time);



    }
    //Получение статистики
    function getStats($code){
        $exist = ShortLinks::where('code', $code)->first();
        if (!is_null($exist)){
        $stats = Statistic::select('code', 'created_at', 'agent')->where('code', $code)->get()->toArray();
        $users = Statistic::select('key')->where('code', $code)
            ->where('created_at', '>', $this->getTime())
            ->get()
            ->unique('key')
            ->toArray();
        $users = sizeof($users);
        return response(['stats' => $stats, 'users' => $users], Response::HTTP_OK);
        }
        else {
            return response(["result" => "Данная ссылка недоступна."], Response::HTTP_BAD_REQUEST);
        }
    }

}

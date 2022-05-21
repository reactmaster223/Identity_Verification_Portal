<?php

namespace App\Imports;

use App\User;
use Maatwebsite\Excel\Concerns\ToModel;

class UsersImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new User([
            'name' => $row[0],
            'company_phone_number' => $row[1],
            'id_number' => $row[2],
            'validity_period' => $row[3],
            'company' => $row[4],
            'serial_number' => $row[5],
            'verification_status' => $row[6]
        ]);
    }
}

<?php
use Illuminate\Database\Seeder;
use App\User;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'username' => 'admin_AlexRossitha99',
            'name' => 'Alex Rossi',
            'role' => 'admin',
            'password' => Hash::make('IvanP.9899'),
            'gender' => 'male',
            'picture' => '...',
            'id_number' => '...',
            'serial_number' => '...',
            'validity_period' => '...',
            'company' => '...',
            'region' => '...',
            'verification_result' => 'nonactivated',
            'health_status' => 'normal',
            'email_verification_status' => 0
        ]);

        User::create([
            'username' => 'SergeyLee199885',
            'name' => 'Sergey Lee',
            'role' => 'practitioner',
            'password' => Hash::make('IvanP.9899'),            
            'gender' => 'male',
            'picture' => '...',
            'id_number' => '...',
            'serial_number' => '...',
            'validity_period' => '...',
            'company' => '...',
            'region' => '...',
            'verification_result' => 'nonactivated',
            'health_status' => 'normal',
            'email_verification_status' => 0
        ]);

        User::create([
            'username' => 'IvanPetrovich199899',
            'name' => 'Ivan Petrovich',
            'role' => 'practitioner',
            'password' => Hash::make('IvanP.9899'),            
            'gender' => 'male',
            'picture' => '...',
            'id_number' => '...',
            'serial_number' => '...',
            'validity_period' => '...',
            'company' => '...',
            'region' => '...',
            'verification_result' => 'nonactivated',
            'health_status' => 'normal',
            'email_verification_status' => 0
        ]);
    }
}

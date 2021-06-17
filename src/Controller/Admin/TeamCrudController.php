<?php

namespace App\Controller\Admin;

use App\Entity\Team;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\EmailField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\UrlField;

class TeamCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Team::class;
    }

    
    public function configureFields(string $pageName): iterable
    {
        return [
            ImageField::new('photo')
                ->setBasePath('image')
                ->setUploadDir('public/image'),
            TextField::new('name'),
            TextField::new('role'),
            UrlField::new('facebook'),
            UrlField::new('twitter'),
            EmailField::new('mail'),
            UrlField::new('google'),
            UrlField::new('linked'),
            
        ];
    }
}

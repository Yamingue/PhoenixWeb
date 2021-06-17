<?php

namespace App\Controller\Admin;

use App\Entity\Solution;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;

class SolutionCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Solution::class;
    }


    public function configureFields(string $pageName): iterable
    {
        return [
            TextField::new('title'),
            TextField::new('short_text'),
            TextEditorField::new('content'),
            ImageField::new('poster')
                ->setBasePath('image/')
                ->setUploadDir('public/image'),
        ];
    }
}

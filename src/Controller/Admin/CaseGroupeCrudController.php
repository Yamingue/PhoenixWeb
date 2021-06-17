<?php

namespace App\Controller\Admin;

use App\Entity\CaseGroupe;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;

class CaseGroupeCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return CaseGroupe::class;
    }

    /*
    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id'),
            TextField::new('title'),
            TextEditorField::new('description'),
        ];
    }
    */
}

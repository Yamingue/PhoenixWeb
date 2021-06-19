<?php

namespace App\Controller\Admin;

use App\Entity\Contact;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;

class ContactCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Contact::class;
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

    public function configureActions(Actions $actions): Actions
{
    return $actions
        // ...
        ->remove(Crud::PAGE_INDEX, Action::EDIT)
        ->remove(Crud::PAGE_INDEX, Action::NEW)
        ->remove(Crud::PAGE_INDEX, Action::DELETE)
        ->remove(Crud::PAGE_DETAIL, Action::EDIT)
        ->add(Crud::PAGE_INDEX,  Action::DETAIL)

    ;
}
}

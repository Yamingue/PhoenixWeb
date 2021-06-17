<?php

namespace App\Controller\Admin;

use App\Entity\CaseStudies;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;

class CaseStudiesCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return CaseStudies::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            TextField::new('title'),
            ImageField::new('photo')
                ->setBasePath('image/')
                ->setUploadDir('public/image'),
            AssociationField::new('case_groupe'),
            TextEditorField::new('description'),
        ];
    }
}

<?php

namespace App\Controller\Admin;

use App\Entity\Post;
use FOS\CKEditorBundle\Form\Type\CKEditorType;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;

class PostCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Post::class;
    }


    public function configureFields(string $pageName): iterable
    {

        yield ImageField::new('poster')
            ->setBasePath('image/')
            ->setUploadDir('public/image');
        yield TextField::new('title');
        yield TextField::new('resume');
        yield TextEditorField::new('content')->setFormType(CKEditorType::class);
    }

    public function createEntity(string $entityFqcn)
    {
        $post = new Post();
        $post->setPostBy($this->getUser());

        return $post;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->addFormTheme('@FOSCKEditor/Form/ckeditor_widget.html.twig');
    }
}

<?php

namespace App\Controller\Admin;

use App\Entity\Post;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;

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
        yield TextEditorField::new('content');
    }

    public function createEntity(string $entityFqcn)
    {
        $post = new Post();
        $post->setPostBy($this->getUser());

        return $post;
    }
}

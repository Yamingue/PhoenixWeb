<?php

namespace App\Entity;

use App\Repository\CaseStudiesRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=CaseStudiesRepository::class)
 */
class CaseStudies
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $title;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $photo;

    /**
     * @ORM\Column(type="text")
     */
    private $description;

    /**
     * @ORM\ManyToOne(targetEntity=CaseGroupe::class, inversedBy="caseStudies")
     */
    private $case_groupe;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $short_text;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getPhoto(): ?string
    {
        return $this->photo;
    }

    public function setPhoto(string $photo): self
    {
        $this->photo = $photo;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getCaseGroupe(): ?CaseGroupe
    {
        return $this->case_groupe;
    }

    public function setCaseGroupe(?CaseGroupe $case_groupe): self
    {
        $this->case_groupe = $case_groupe;

        return $this;
    }

    public function getShortText(): ?string
    {
        return $this->short_text;
    }

    public function setShortText(?string $short_text): self
    {
        $this->short_text = $short_text;

        return $this;
    }
}

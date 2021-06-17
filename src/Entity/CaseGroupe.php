<?php

namespace App\Entity;

use App\Repository\CaseGroupeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=CaseGroupeRepository::class)
 */
class CaseGroupe
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
     * @ORM\OneToMany(targetEntity=CaseStudies::class, mappedBy="case_groupe")
     */
    private $caseStudies;

    public function __construct()
    {
        $this->caseStudies = new ArrayCollection();
    }

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

    /**
     * @return Collection|CaseStudies[]
     */
    public function getCaseStudies(): Collection
    {
        return $this->caseStudies;
    }

    public function addCaseStudy(CaseStudies $caseStudy): self
    {
        if (!$this->caseStudies->contains($caseStudy)) {
            $this->caseStudies[] = $caseStudy;
            $caseStudy->setCaseGroupe($this);
        }

        return $this;
    }

    public function removeCaseStudy(CaseStudies $caseStudy): self
    {
        if ($this->caseStudies->removeElement($caseStudy)) {
            // set the owning side to null (unless already changed)
            if ($caseStudy->getCaseGroupe() === $this) {
                $caseStudy->setCaseGroupe(null);
            }
        }

        return $this;
    }

    public function __toString()
    {
        return $this->title;
    }
}

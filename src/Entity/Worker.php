<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use JsonSerializable;
use App\Repository\WorkerRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=WorkerRepository::class)
 */
class Worker implements JsonSerializable
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
    private $name;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $surname;

    /**
     * @ORM\ManyToMany(targetEntity=Skill::class, inversedBy="workers")
     */
    private $skills;

    /**
     * @ORM\OneToMany(targetEntity=Log::class, mappedBy="worker", cascade={"remove"})
     */
    private $Logs;

    /**
     * @ORM\ManyToMany(targetEntity=Access::class, inversedBy="workers")
     */
    private $access;

    public function __construct()
    {
        $this->skills = new ArrayCollection();
        $this->Logs = new ArrayCollection();
        $this->access = new ArrayCollection();
    }

    public function jsonSerialize()
    {
        return array(
            'id' => $this->id,
            'name' => $this->name,
            'surname' => $this->surname,
            'skills' => array_values($this->skills->toArray()),
            'access' => array_values($this->access->toArray()),
        );
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getSurname(): ?string
    {
        return $this->surname;
    }

    public function setSurname(string $surname): self
    {
        $this->surname = $surname;

        return $this;
    }

    public function getFullname(): ?string
    {
        return $this->name.' '.$this->surname;
    }

    /**
     * @return Collection|Skill[]
     */
    public function getSkills(): Collection
    {
        return $this->skills;
    }

    public function addSkill(Skill $skill): self
    {
        if (!$this->skills->contains($skill)) {
            $this->skills[] = $skill;
        }

        return $this;
    }

    public function removeSkill(Skill $skill): self
    {
        if ($this->skills->contains($skill)) {
            $this->skills->removeElement($skill);
        }

        return $this;
    }

    /**
     * @return Collection|Log[]
     */
    public function getLogs(): Collection
    {
        return $this->Logs;
    }

    public function addLog(Log $log): self
    {
        if (!$this->Logs->contains($log)) {
            $this->Logs[] = $log;
            $log->setWorker($this);
        }

        return $this;
    }

    public function removeLog(Log $log): self
    {
        if ($this->Logs->contains($log)) {
            $this->Logs->removeElement($log);
            // set the owning side to null (unless already changed)
            if ($log->getWorker() === $this) {
                $log->setWorker(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Access[]
     */
    public function getAccess(): Collection
    {
        return $this->access;
    }

    public function addAccess(Access $access): self
    {
        if (!$this->access->contains($access)) {
            $this->access[] = $access;
        }

        return $this;
    }

    public function removeAccess(Access $access): self
    {
        if ($this->access->contains($access)) {
            $this->access->removeElement($access);
        }

        return $this;
    }
}
